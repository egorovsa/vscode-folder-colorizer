import * as vscode from "vscode";
import emoji from "./lists/emoji.json";
import {
  checkIfItFirstTimeRun,
  getColorOptions,
  getConfigPathColors,
  getUpdatedPathColors,
  updateConfigPathColors,
  userPathBasePathLess,
} from "./utils";
import { PathColors, PathsColors } from "./types";
import { colorDisposable, colorize } from "./utils/colorize";
import {
  setBadgeCommand,
  setColorCommand,
  setEmojiBadgeCommand,
} from "./commands";
import { setColorFileExtCommand } from "./commands/setColorFileExtCommand";
import { registerRenameHandler } from "./handlers";
import { registerControlPanelCommand } from "./panel/controlPanel";

const changeConfig = (pathColor: Partial<PathsColors>, toRemove = false) => {
  const pathColors = getUpdatedPathColors(pathColor, toRemove);
  updateConfigPathColors(pathColors);
  colorize();
};

const registerContextMenu = (context: vscode.ExtensionContext) => {
  const clearColorizerDisposable = vscode.commands.registerCommand(
    "folder-color.clearColorizer",
    function (_, context2: vscode.Uri[]) {
      vscode.window;
      const folderPath = context2.map((item) =>
        userPathBasePathLess(item.fsPath)
      );
      changeConfig({ folderPath }, true);
    }
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "folder-color.setColor",
      setColorCommand(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "folder-color.setColorForExtension",
      setColorFileExtCommand(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "folder-color.setFilesColor",
      setColorFileExtCommand(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("folder-color.setBadge", setBadgeCommand)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "folder-color.setEmojiBadge",
      setEmojiBadgeCommand()
    )
  );

  // context.subscriptions.push(setColorForExtensionDisposable);
  context.subscriptions.push(clearColorizerDisposable);
  context.subscriptions.push(registerControlPanelCommand(context));
};

export function activate(context: vscode.ExtensionContext) {
  checkIfItFirstTimeRun(context);
  const workspace = vscode?.workspace?.workspaceFolders?.[0];

  if (!workspace) {
    return;
  }

  registerRenameHandler();
  registerContextMenu(context);
  colorize();

  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("folder-color.pathColors")) {
      colorize();
    }
  });
}

export function deactivate(context: vscode.ExtensionContext) {
  context.subscriptions.forEach((item) => item.dispose());
  colorDisposable.dispose();
}
