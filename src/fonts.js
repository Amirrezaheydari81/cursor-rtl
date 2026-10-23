// @ts-check
'use strict';

const { execFile } = require('child_process');

/** Well-known fonts with good Persian glyphs, shown first in the picker when installed. */
const PERSIAN_FONTS = [
  'Vazirmatn', 'Vazir', 'Vazir Code', 'Shabnam', 'Sahel', 'Samim', 'Tanha', 'Parastoo', 'Gandom',
  'Estedad', 'Lalezar', 'Mikhak', 'Dana', 'Peyda', 'Kalameh', 'Yekan Bakh', 'IRANSans', 'IRANSansX',
  'IRANYekan', 'IRANYekanX', 'Noto Sans Arabic', 'Noto Naskh Arabic', 'B Nazanin', 'B Yekan',
  'B Mitra', 'B Titr', 'Tahoma', 'Segoe UI',
];

const STYLE_WORDS = /\s+(thin|hairline|extra ?light|ultra ?light|light|regular|normal|book|medium|semi ?bold|demi ?bold|bold|extra ?bold|ultra ?bold|black|heavy|italic|oblique|variable|vf|fd|ui)\b/gi;

/**
 * @param {string} file
 * @param {string[]} args
 * @returns {Promise<string>}
 */
function run(file, args) {
  return new Promise((resolve) => {
    execFile(file, args, { maxBuffer: 64 * 1024 * 1024, windowsHide: true }, (err, stdout) => {
      resolve(err ? '' : stdout);
    });
  });
}

/** @returns {Promise<string[]>} */
async function listWindowsFonts() {
  const script = [
    '[Console]::OutputEncoding = [Text.Encoding]::UTF8',
    'Add-Type -AssemblyName System.Drawing',
    '(New-Object System.Drawing.Text.InstalledFontCollection).Families | ForEach-Object { $_.Name }',
  ].join('; ');
  const out = await run('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script]);
  const names = out.split(/\r?\n/).map((name) => name.replace(STYLE_WORDS, '').replace(STYLE_WORDS, '').trim());
  if (names.some(Boolean)) return names;

  // `reg` prints in the OEM code page, so non-Latin names may be garbled; only used as a fallback.
  const keys = [
    'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts',
    'HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts',
  ];
  const outputs = await Promise.all(keys.map((key) => run('reg', ['query', key])));
  return outputs
    .flatMap((out) => out.split(/\r?\n/))
    .map((line) => line.match(/^\s{4}(.+?)\s{4}REG_\w+\s{4}/))
    .filter((m) => !!m)
    .flatMap((m) => /** @type {RegExpMatchArray} */ (m)[1].replace(/\s*\((TrueType|OpenType|All res)\)\s*$/i, '').split(' & '))
    .map((name) => name.replace(STYLE_WORDS, '').replace(STYLE_WORDS, '').trim());
}

/** @returns {Promise<string[]>} */
async function listMacFonts() {
  const out = await run('system_profiler', ['SPFontsDataType', '-json']);
  try {
    const data = JSON.parse(out).SPFontsDataType || [];
    return data.flatMap((/** @type {any} */ font) => (font.typefaces || []).map((/** @type {any} */ t) => t.family));
  } catch {
    return [];
  }
}

/** @returns {Promise<string[]>} */
async function listLinuxFonts() {
  const out = await run('fc-list', [':', 'family']);
  return out.split('\n').flatMap((line) => line.split(','));
}

/**
 * Lists installed font families (best effort, per platform).
 * @returns {Promise<{ persian: string[], others: string[] }>}
 */
async function listInstalledFonts() {
  const raw = process.platform === 'win32'
    ? await listWindowsFonts()
    : process.platform === 'darwin'
      ? await listMacFonts()
      : await listLinuxFonts();

  /** @type {Map<string, string>} */
  const unique = new Map();
  for (const name of raw) {
    const trimmed = (name || '').trim();
    if (trimmed && !unique.has(trimmed.toLowerCase())) unique.set(trimmed.toLowerCase(), trimmed);
  }

  const persian = PERSIAN_FONTS.filter((f) => unique.has(f.toLowerCase()));
  const persianSet = new Set(persian.map((f) => f.toLowerCase()));
  const others = [...unique.values()]
    .filter((f) => !persianSet.has(f.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
  return { persian, others };
}

module.exports = { listInstalledFonts };
