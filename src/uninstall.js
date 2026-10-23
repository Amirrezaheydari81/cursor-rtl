// @ts-check
'use strict';

// Run by Cursor (as plain Node, via `vscode:uninstall`) after the extension is removed.

const path = require('path');
const patcher = require('./patcher');

const exeDir = path.dirname(process.execPath);
const candidates = process.platform === 'darwin'
  ? [path.join(exeDir, '..', 'Resources', 'app')]
  : [path.join(exeDir, 'resources', 'app')];

for (const appRoot of candidates) {
  try {
    patcher.uninstall(appRoot);
  } catch (err) {
    console.error('[cursor-rtl] uninstall cleanup failed:', err);
  }
}
