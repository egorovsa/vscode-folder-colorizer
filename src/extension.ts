import * as vscode from "vscode";
import { userPathLessPath } from "./utils/userPathLessPath";
const fs = require("fs");
const path = require("path");
import emoji from "./emoji.json";

interface PathColors {
  folderPath: string;
  color?: string;
  badge?: string;
}

let colorDisposable: vscode.Disposable;

const colorize = () => {
  if (colorDisposable) {
    colorDisposable.dispose();
  }

  let config = vscode.workspace.getConfiguration("folder-color");
  let pathColors = config.get("pathColors") as PathColors[];

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

      const newColor = bestFit.color
        ? new vscode.ThemeColor(bestFit.color)
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

const updateConfig = (pathColor: Partial<PathColors>, toRemove = false) => {
  const config = vscode.workspace.getConfiguration("folder-color");
  const pathColors = [...((config.get("pathColors") as PathColors[]) || [])];

  const existingPath = pathColors?.find(
    (item) => item.folderPath === pathColor.folderPath
  );

  if (toRemove && existingPath) {
    const index = pathColors.indexOf(existingPath);
    pathColors.splice(index, 1);
    config.update("pathColors", pathColors);
  } else if (existingPath) {
    existingPath.color = pathColor.color || existingPath.color;
    existingPath.badge = pathColor.badge || existingPath.badge;
    config.update("pathColors", pathColors);
  } else {
    config.update("pathColors", [...pathColors, pathColor]);
  }

  colorize();
};

const registerContextMenu = (context: vscode.ExtensionContext) => {
  const packageJsonPath = path.join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  const colors: { id: string; description: string }[] =
    packageJson.contributes.colors;

  let setColorDisposable = vscode.commands.registerCommand(
    "folder-color.setColor",
    function (context) {
      vscode.window
        .showQuickPick(
          colors.map(({ id, description }) => ({
            label: description,
            description: id,
          })),
          {
            placeHolder: "Choose color: ",
          }
        )
        .then((selected) => {
          if (!selected) {
            return;
          }

          updateConfig({
            folderPath: userPathLessPath(context.fsPath),
            color: selected.description,
          });
        });
    }
  );

  let setBadgeDisposable = vscode.commands.registerCommand(
    "folder-color.setBadge",
    function (context) {
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

          updateConfig({
            folderPath: userPathLessPath(context.fsPath),
            badge: value,
          });
        });
    }
  );

  let setEmojiBadgeDisposable = vscode.commands.registerCommand(
    "folder-color.setEmojiBadge",
    function (context) {
      console.log(emoji);

      vscode.window
        .showQuickPick(
          emoji.map(({ description, emoji }) => ({
            label: description,
            description: emoji,
          })),
          {
            placeHolder: "Choose emoji badge: ",
          }
        )
        .then((selected) => {
          if (!selected) {
            return;
          }

          updateConfig({
            folderPath: userPathLessPath(context.fsPath),
            badge: selected.description,
          });
        });
    }
  );

  let clearColorizerDisposable = vscode.commands.registerCommand(
    "folder-color.clearColorizer",
    function (context) {
      vscode.window;

      updateConfig(
        {
          folderPath: userPathLessPath(context.fsPath),
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

function checkIfItFirstTimeRun(context: vscode.ExtensionContext) {
  const firstTimeRunFlag = "FOLDER_COLORIZER_FIRST_TIME_RUN1";

  if (context.globalState.get(firstTimeRunFlag, true)) {
    vscode.window
      .showInformationMessage(
        "To activate folder colors feature in VSCode, please reload the editor now.",
        "Reload"
      )
      .then((selection) => {
        if (selection === "Reload") {
          vscode.commands.executeCommand("workbench.action.reloadWindow");
        }
      });

    context.globalState.update(firstTimeRunFlag, false);
  }
}

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
