import * as vscode from "vscode";
import colors from "../lists/colors.json";
import { PathColors } from "../types";
import { colorize } from "../utils/colorize";
import {
  getConfigPathColors,
  getFavoriteColors,
  getUseGlobalSettings,
  updateConfigPathColors,
  updateFavoriteColors,
  updateUseGlobalSettings,
} from "../utils/useConfig";
import { userPathBasePathLess } from "../utils/userPathLessPath";

interface ControlPanelMessage {
  type:
    | "getState"
    | "savePathColors"
    | "clearAll"
    | "pickPath"
    | "setUseGlobalSettings"
    | "setFavoriteColors";
  payload?: PathColors[];
  useGlobalSettings?: boolean;
  favoriteColors?: string[];
}

const getWebviewHtml = (
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string => {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "out", "webview", "index.js")
  );
  const nonce = String(Date.now());

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Folder Color Control Panel</title>
  </head>
  <body>
    <div id="root"></div>
    <script nonce="${nonce}" src="${scriptUri}"></script>
  </body>
</html>`;
};

const postState = (webview: vscode.Webview) => {
  webview.postMessage({
    type: "state",
    payload: {
      pathColors: getConfigPathColors(),
      favoriteColors: getFavoriteColors(),
      useGlobalSettings: getUseGlobalSettings(),
      colorOptions: colors.map(({ id, description, defaults }) => ({
        id,
        description,
        hex: defaults.dark,
      })),
    },
  });
};

export const registerControlPanelCommand = (
  context: vscode.ExtensionContext
): vscode.Disposable => {
  return vscode.commands.registerCommand(
    "folder-color.openControlPanel",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "folderColorControlPanel",
        "Folder Color - Control Panel",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, "out", "webview"),
          ],
        }
      );

      panel.webview.html = getWebviewHtml(panel.webview, context.extensionUri);

      const configDisposable = vscode.workspace.onDidChangeConfiguration(
        (event) => {
          if (
            event.affectsConfiguration("folder-color.pathColors") ||
            event.affectsConfiguration("folder-color.useGlobalSettings") ||
            event.affectsConfiguration("folder-color.favoriteColors")
          ) {
            postState(panel.webview);
          }
        }
      );

      panel.onDidDispose(() => {
        configDisposable.dispose();
      });

      panel.webview.onDidReceiveMessage(async (message: ControlPanelMessage) => {
        if (message.type === "getState") {
          postState(panel.webview);
          return;
        }

        if (message.type === "savePathColors") {
          await updateConfigPathColors(message.payload || []);
          colorize();
          postState(panel.webview);
          return;
        }

        if (message.type === "clearAll") {
          const confirmation = await vscode.window.showWarningMessage(
            "Remove all folder color rules?",
            {
              modal: true,
              detail: "This action clears all configured path colors and badges.",
            },
            "Clear all"
          );

          if (confirmation !== "Clear all") {
            return;
          }

          await updateConfigPathColors([]);
          colorize();
          postState(panel.webview);
          return;
        }

        if (message.type === "pickPath") {
          const selected = await vscode.window.showOpenDialog({
            canSelectMany: false,
            canSelectFiles: true,
            canSelectFolders: true,
            openLabel: "Use selected path",
          });

          const selectedPath = selected?.[0];

          if (!selectedPath) {
            return;
          }

          panel.webview.postMessage({
            type: "pathPicked",
            payload: {
              folderPath: userPathBasePathLess(selectedPath.fsPath),
            },
          });
          return;
        }

        if (message.type === "setUseGlobalSettings") {
          await updateUseGlobalSettings(Boolean(message.useGlobalSettings));
          postState(panel.webview);
          return;
        }

        if (message.type === "setFavoriteColors") {
          await updateFavoriteColors(message.favoriteColors || []);
          postState(panel.webview);
        }
      });

      postState(panel.webview);
    }
  );
};
