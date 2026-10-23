// @ts-check
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const CSS_FILE_NAME = 'cursor-rtl.css';
const MARK_START = '<!-- cursor-rtl:start -->';
const MARK_END = '<!-- cursor-rtl:end -->';
const BLOCK_PATTERN = /<!-- cursor-rtl:start -->[\s\S]*?<!-- cursor-rtl:end -->\n\t?/g;

// VS Code renamed electron-sandbox to electron-browser in newer releases.
const WORKBENCH_CANDIDATES = [
  'out/vs/code/electron-sandbox/workbench/workbench.html',
  'out/vs/code/electron-browser/workbench/workbench.html',
];

class PatchError extends Error {
  /**
   * @param {string} message
   * @param {unknown} [cause]
   */
  constructor(message, cause) {
    super(message);
    this.name = 'PatchError';
    this.cause = cause;
    this.permissionDenied = !!cause && ['EACCES', 'EPERM'].includes(/** @type {any} */ (cause).code);
  }
}

/**
 * @param {string} appRoot
 */
function resolvePaths(appRoot) {
  const relative = WORKBENCH_CANDIDATES.find((rel) => fs.existsSync(path.join(appRoot, rel)));
  if (!relative) {
    throw new PatchError(`workbench.html was not found under ${appRoot}`);
  }
  const html = path.join(appRoot, relative);
  return {
    html,
    css: path.join(path.dirname(html), CSS_FILE_NAME),
    product: path.join(appRoot, 'product.json'),
    checksumKey: relative.replace(/^out\//, ''),
  };
}

/** @param {string | Buffer} data */
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('base64').replace(/=+$/, '');
}

/**
 * @param {string} file
 * @param {string} data
 */
function write(file, data) {
  try {
    fs.writeFileSync(file, data, 'utf8');
  } catch (err) {
    throw new PatchError(`Could not write ${file}`, err);
  }
}

/** @param {string} html */
function stripBlock(html) {
  return html.replace(BLOCK_PATTERN, '');
}

/**
 * Keeps product.json in sync with workbench.html so Cursor doesn't report a corrupt install.
 * The value is replaced textually to preserve the file's original formatting.
 * @param {ReturnType<typeof resolvePaths>} paths
 * @param {string} html
 */
function syncChecksum(paths, html) {
  const product = fs.readFileSync(paths.product, 'utf8');
  const key = paths.checksumKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`("${key}"\\s*:\\s*")([^"]*)(")`);
  const match = product.match(pattern);
  const checksum = sha256(html);
  if (!match || match[2] === checksum) return;
  write(paths.product, product.replace(pattern, `$1${checksum}$3`));
}

/**
 * @param {string} appRoot
 * @returns {{ installed: boolean, cssHash: string | null }}
 */
function getStatus(appRoot) {
  const paths = resolvePaths(appRoot);
  const html = fs.readFileSync(paths.html, 'utf8');
  const match = html.match(/cursor-rtl\.css\?v=([0-9a-f]+)/);
  return {
    installed: html.includes(MARK_START) && fs.existsSync(paths.css),
    cssHash: match ? match[1] : null,
  };
}

/**
 * Writes the stylesheet and links it from workbench.html.
 * @param {string} appRoot
 * @param {string} css
 * @returns {boolean} true when files changed and a window reload is needed
 */
function install(appRoot, css) {
  const paths = resolvePaths(appRoot);
  const hash = crypto.createHash('sha1').update(css).digest('hex').slice(0, 10);
  const status = getStatus(appRoot);
  if (status.installed && status.cssHash === hash) return false;

  write(paths.css, css);

  const original = stripBlock(fs.readFileSync(paths.html, 'utf8'));
  if (!original.includes('</head>')) {
    throw new PatchError(`Unexpected workbench.html format: ${paths.html}`);
  }
  const block = `${MARK_START}<link rel="stylesheet" href="./${CSS_FILE_NAME}?v=${hash}">${MARK_END}\n\t`;
  const patched = original.replace('</head>', `${block}</head>`);
  write(paths.html, patched);
  syncChecksum(paths, patched);
  return true;
}

/**
 * Restores workbench.html and product.json to their original state.
 * @param {string} appRoot
 * @returns {boolean} true when something was removed
 */
function uninstall(appRoot) {
  const paths = resolvePaths(appRoot);
  const html = fs.readFileSync(paths.html, 'utf8');
  const restored = stripBlock(html);
  const changed = restored !== html || fs.existsSync(paths.css);

  if (restored !== html) {
    write(paths.html, restored);
    syncChecksum(paths, restored);
  }
  if (fs.existsSync(paths.css)) {
    try {
      fs.unlinkSync(paths.css);
    } catch (err) {
      throw new PatchError(`Could not delete ${paths.css}`, err);
    }
  }
  return changed;
}

module.exports = { install, uninstall, getStatus, resolvePaths, PatchError };
