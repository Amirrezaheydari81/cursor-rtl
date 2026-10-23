// @ts-check
'use strict';

const vscode = require('vscode');
const { buildCss } = require('./css');
const patcher = require('./patcher');
const { listInstalledFonts } = require('./fonts');

const SECTION = 'cursorRtl';

/** @type {NodeJS.Timeout | undefined} */
let syncTimer;
let reloadPromptVisible = false;

/** @returns {import('./css').RtlOptions & { enabled: boolean }} */
function readOptions() {
  const config = vscode.workspace.getConfiguration(SECTION);
  return {
    enabled: config.get('enabled', true),
    direction: config.get('direction', 'rtl') === 'auto' ? 'auto' : 'rtl',
    fontFamily: config.get('font.family', ''),
    fontSize: config.get('font.size', 0),
    lineHeight: config.get('font.lineHeight', 0),
    fontInInput: config.get('font.applyToInput', true),
    customCss: config.get('customCss', ''),
  };
}

async function promptReload() {
  if (reloadPromptVisible) return;
  reloadPromptVisible = true;
  const reload = vscode.l10n.t('Reload Window');
  const choice = await vscode.window.showInformationMessage(
    vscode.l10n.t('Cursor RTL: changes are ready. Reload the window to apply them.'),
    reload,
  );
  reloadPromptVisible = false;
  if (choice === reload) {
    await vscode.commands.executeCommand('workbench.action.reloadWindow');
  }
}

/** @param {unknown} err */
function reportError(err) {
  const detail = err instanceof Error ? err.message : String(err);
  const hint = err instanceof patcher.PatchError && err.permissionDenied
    ? process.platform === 'win32'
      ? vscode.l10n.t('Cursor\'s install folder is not writable. Run Cursor once as administrator, then run "Cursor RTL: Re-apply Patch".')
      : vscode.l10n.t('Cursor\'s install folder is not writable. Give your user write access to it (e.g. with chown), then run "Cursor RTL: Re-apply Patch".')
    : '';
  vscode.window.showErrorMessage(`Cursor RTL: ${detail}${hint ? `\n${hint}` : ''}`);
}

/**
 * Brings Cursor's files in line with the current settings.
 * @param {{ force?: boolean }} [opts]
 */
function sync(opts = {}) {
  const appRoot = vscode.env.appRoot;
  const options = readOptions();
  try {
    if (opts.force) patcher.uninstall(appRoot);
    const changed = options.enabled
      ? patcher.install(appRoot, buildCss(options))
      : patcher.uninstall(appRoot);
    if (changed || opts.force) promptReload();
  } catch (err) {
    reportError(err);
  }
}

function scheduleSync() {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => sync(), 400);
}

/** @param {boolean} enabled */
async function setEnabled(enabled) {
  const config = vscode.workspace.getConfiguration(SECTION);
  if (config.get('enabled') === enabled) {
    sync({ force: enabled });
    return;
  }
  await config.update('enabled', enabled, vscode.ConfigurationTarget.Global);
}

async function selectFont() {
  const current = vscode.workspace.getConfiguration(SECTION).get('font.family', '');

  /** @type {Promise<{ persian: string[], others: string[] }>} */
  const fontsPromise = vscode.window.withProgress(
    { location: vscode.ProgressLocation.Window, title: vscode.l10n.t('Reading installed fonts...') },
    () => listInstalledFonts(),
  );

  const customLabel = vscode.l10n.t('$(edit) Enter a font name...');
  const defaultLabel = vscode.l10n.t('$(discard) Cursor default font');

  const itemsPromise = fontsPromise.then(({ persian, others }) => {
    /** @param {string} name */
    const toItem = (name) => ({
      label: name,
      description: name === current ? vscode.l10n.t('current') : undefined,
    });
    /** @type {vscode.QuickPickItem[]} */
    const items = [{ label: customLabel, alwaysShow: true }, { label: defaultLabel, alwaysShow: true }];
    if (persian.length) {
      items.push({ label: vscode.l10n.t('Persian fonts'), kind: vscode.QuickPickItemKind.Separator });
      items.push(...persian.map(toItem));
    }
    items.push({ label: vscode.l10n.t('All installed fonts'), kind: vscode.QuickPickItemKind.Separator });
    items.push(...others.map(toItem));
    return items;
  });

  const picked = await vscode.window.showQuickPick(itemsPromise, {
    title: vscode.l10n.t('Cursor RTL: chat font'),
    placeHolder: current
      ? vscode.l10n.t('Current font: {0}', current)
      : vscode.l10n.t('Pick a font for the chat'),
    matchOnDescription: true,
  });
  if (!picked) return;

  let family = picked.label;
  if (picked.label === defaultLabel) {
    family = '';
  } else if (picked.label === customLabel) {
    const typed = await vscode.window.showInputBox({
      title: vscode.l10n.t('Cursor RTL: chat font'),
      prompt: vscode.l10n.t('Font family name as installed on your system. Separate fallbacks with commas.'),
      value: current,
    });
    if (typed === undefined) return;
    family = typed.trim();
  }

  await vscode.workspace
    .getConfiguration(SECTION)
    .update('font.family', family, vscode.ConfigurationTarget.Global);
}

/** @param {vscode.ExtensionContext} context */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('cursorRtl.enable', () => setEnabled(true)),
    vscode.commands.registerCommand('cursorRtl.disable', () => setEnabled(false)),
    vscode.commands.registerCommand('cursorRtl.selectFont', selectFont),
    vscode.commands.registerCommand('cursorRtl.reapply', () => sync({ force: readOptions().enabled })),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(SECTION)) scheduleSync();
    }),
    { dispose: () => clearTimeout(syncTimer) },
  );

  // Cursor updates overwrite workbench.html, so re-check on every startup.
  sync();
}

function deactivate() {}

module.exports = { activate, deactivate };
