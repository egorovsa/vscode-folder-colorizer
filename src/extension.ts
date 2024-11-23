import * as vscode from "vscode";
import emoji from "./lists/emoji.json";
import {
  checkIfItFirstTimeRun,
  getColorOptions,
  getPathColors,
  getUpdatedPathColors,
  updateConfigPathColors,
  userPathLessPath,
} from "./utils";
import { PathsColors } from "./types";

let colorDisposable: vscode.Disposable;

const colorize = () => {
  if (colorDisposable) {
    colorDisposable.dispose();
  }

  let pathColors = getPathColors();

  let provider: vscode.FileDecorationProvider = {
    provideFileDecoration: (
      uri: vscode.Uri,
      token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.FileDecoration> => {
      const projectPath = userPathLessPath(uri.fsPath);

      const matchingPaths = pathColors
        .filter((item) => projectPath.includes(item.folderPath))
        .sort((a, b) => b.folderPath.length - a.folderPath.length);

      const bestFit = matchingPaths[0];
      const bestFitColor = matchingPaths.find((item) => item.color)?.color;

      const newColor = bestFitColor
        ? new vscode.ThemeColor(bestFitColor)
        : undefined;

      if (bestFit) {
        return new vscode.FileDecoration(
          bestFit.badge || undefined,
          "",
          newColor
        );
      }

      return new vscode.FileDecoration();
    },
  };

  colorDisposable = vscode.window.registerFileDecorationProvider(provider);
};

const changeConfig = (pathColor: Partial<PathsColors>, toRemove = false) => {
  const pathColors = getUpdatedPathColors(pathColor, toRemove);
  updateConfigPathColors(pathColors);
  colorize();
};

const registerContextMenu = (context: vscode.ExtensionContext) => {
  let setColorDisposable = vscode.commands.registerCommand(
    "folder-color.setColor",
    (_, context2: vscode.Uri[]) => {
      const options = getColorOptions(context);

      vscode.window
        .showQuickPick(options, {
          placeHolder: "Choose a color: ",
        })
        .then((selected) => {
          if (!selected) {
            return;
          }

          changeConfig({
            folderPath: context2.map((item) => userPathLessPath(item.fsPath)),
            color: selected.description,
          });
        });
    }
  );

  let setBadgeDisposable = vscode.commands.registerCommand(
    "folder-color.setBadge",
    function (_, context2: vscode.Uri[]) {
      vscode.window
        .showInputBox({
          prompt: "Set folder badge",
          placeHolder: "WS",
          validateInput: (text: string): string | null => {
            if (text.length > 2) {
              return "Must be no more than 2 symbols";
            }

            return null;
          },
        })
        .then((value) => {
          if (!value) {
            return;
          }

          changeConfig({
            folderPath: context2.map((item) => userPathLessPath(item.fsPath)),
            badge: value,
          });
        });
    }
  );

  let setEmojiBadgeDisposable = vscode.commands.registerCommand(
    "folder-color.setEmojiBadge",
    function (_, context2: vscode.Uri[]) {
      vscode.window
        .showQuickPick(
          emoji.map(({ description, emoji }) => ({
            label: emoji,
            description,
          })),
          {
            placeHolder: "Choose emoji badge: ",
          }
        )
        .then((selected) => {
          if (!selected) {
            return;
          }

          changeConfig({
            folderPath: context2.map((item) => userPathLessPath(item.fsPath)),
            badge: selected.label,
          });
        });
    }
  );

  let clearColorizerDisposable = vscode.commands.registerCommand(
    "folder-color.clearColorizer",
    function (_, context2: vscode.Uri[]) {
      vscode.window;

      changeConfig(
        {
          folderPath: context2.map((item) => userPathLessPath(item.fsPath)),
        },
        true
      );
    }
  );

  context.subscriptions.push(setColorDisposable);
  context.subscriptions.push(setBadgeDisposable);
  context.subscriptions.push(setEmojiBadgeDisposable);
  context.subscriptions.push(clearColorizerDisposable);
};

export function activate(context: vscode.ExtensionContext) {
  checkIfItFirstTimeRun(context);
  const workspace = vscode?.workspace?.workspaceFolders?.[0];

  if (!workspace) {
    return;
  }

  registerContextMenu(context);
  colorize();

  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("folder-color.pathColors")) {
      colorize();
    }
  });
}

export function deactivate() {}
