const fs = require("fs");
const path = require("path");
import * as vscode from "vscode";
import { userPathLessPath } from "./utils/userPathLessPath";
import emoji from "./emoji.json";

interface PathColors {
  folderPath: string;
  color?: string;
  badge?: string;
}

interface PathsColors {
  folderPath: string[];
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

const updateConfigNew = (pathColor: Partial<PathsColors>, toRemove = false) => {
  const config = vscode.workspace.getConfiguration("folder-color");
  const pathColors = [...((config.get("pathColors") as PathColors[]) || [])];

  pathColor.folderPath?.forEach((pathItem) => {
    const existingPath = pathColors?.find(
      (item) => item.folderPath === pathItem
    );

    if (toRemove && existingPath) {
      const index = pathColors.indexOf(existingPath);
      pathColors.splice(index, 1);
    } else if (existingPath) {
      existingPath.color = pathColor.color || existingPath.color;
      existingPath.badge = pathColor.badge || existingPath.badge;
    } else {
      pathColors.push({
        folderPath: pathItem,
        color: pathColor.color,
        badge: pathColor.badge,
      });
    }
  });

  config.update("pathColors", pathColors);
  colorize();
};

const registerContextMenu = (context: vscode.ExtensionContext) => {
  const packageJsonPath = path.join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  const colors: {
    id: string;
    description: string;
    defaults: { light: string; dark: string };
  }[] = packageJson.contributes.colors;

  const options = colors.map(({ id, description, defaults }) => ({
    label: description,
    description: id,
    iconPath: getIconPath(context, defaults.dark),
  }));

  let setColorDisposable = vscode.commands.registerCommand(
    "folder-color.setColor",
    (_, context2: vscode.Uri[]) => {
      vscode.window
        .showQuickPick(options, {
          placeHolder: "Choose a color: ",
        })
        .then((selected) => {
          if (!selected) {
            return;
          }

          updateConfigNew({
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

          updateConfigNew({
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

          updateConfigNew({
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

      updateConfigNew(
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

function getIconPath(context: vscode.ExtensionContext, color: string) {
  const fileName = color.replace("#", "color_");

  return vscode.Uri.file(
    path.join(context.extensionPath, "resources", "icons", `${fileName}.svg`)
  );
}

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
