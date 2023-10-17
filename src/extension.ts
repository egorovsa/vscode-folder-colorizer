import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");

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

  let config = vscode.workspace.getConfiguration("folder-colorizer");
  let pathColors = config.get("pathColors") as PathColors[];

  let provider: vscode.FileDecorationProvider = {
    provideFileDecoration: (
      uri: vscode.Uri,
      token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.FileDecoration> => {
      const matchingPaths = pathColors
        .filter((item) => `${uri.fsPath}/`.includes(item.folderPath))
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
  const config = vscode.workspace.getConfiguration("folder-colorizer");
  const pathColors = [...((config.get("pathColors") as PathColors[]) || [])];

  const existingPath = pathColors?.find(
    (item) => item.folderPath === pathColor.folderPath
  );

  console.log({ toRemove, existingPath });

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

const userPathLessPath = (path: string) => {
  const workspace = vscode?.workspace?.workspaceFolders?.[0];
  console.log({ workspace });

  let folderPath = path.replace(new RegExp(`.*\/(${workspace?.name})`), "$1");

  return folderPath + "/";
};

const registerContextMenu = (context: vscode.ExtensionContext) => {
  const packageJsonPath = path.join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const colors: { id: string; description: string }[] =
    packageJson.contributes.colors;

  let setColorDisposable = vscode.commands.registerCommand(
    "folder-colorizer.setColor",
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
          if (!selected) return; // Если ничего не выбрано

          updateConfig({
            folderPath: userPathLessPath(context.fsPath),
            color: selected.description,
          });
        });
    }
  );

  let setBadgeDisposable = vscode.commands.registerCommand(
    "folder-colorizer.setBadge",
    function (context) {
      console.log("setBadge", { context });

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
          if (!value) return;
          console.log({ value });

          updateConfig({
            folderPath: userPathLessPath(context.fsPath),
            badge: value,
          });
        });
    }
  );

  let clearColorizerDisposable = vscode.commands.registerCommand(
    "folder-colorizer.clearColorizer",
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
  context.subscriptions.push(clearColorizerDisposable);
};

export function activate(context: vscode.ExtensionContext) {
  const workspace = vscode?.workspace?.workspaceFolders?.[0];

  if (!workspace) {
    return;
  }

  colorize();

  registerContextMenu(context);

  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("folder-colorizer.pathColors")) {
      colorize();
    }
  });
}

export function deactivate() {}
