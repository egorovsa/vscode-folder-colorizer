import * as vscode from "vscode";
import { getConfigPathColors } from "./useConfig";
import { userPathBasePathLess } from "./userPathLessPath";
import { getResultColorBadge } from "./getResultColorBadge";

export let colorDisposable: vscode.Disposable;

export const colorize = () => {
  colorDisposable?.dispose();

  let pathColors = getConfigPathColors();

  let provider: vscode.FileDecorationProvider = {
    provideFileDecoration: async (
      uri: vscode.Uri,
      token: vscode.CancellationToken
    ): Promise<vscode.FileDecoration> => {
      let entryIsFile: boolean | undefined;
      try {
        const stat = await vscode.workspace.fs.stat(uri);
        if ((stat.type & vscode.FileType.Directory) !== 0) {
          entryIsFile = false;
        } else if ((stat.type & vscode.FileType.File) !== 0) {
          entryIsFile = true;
        }
      } catch {
        entryIsFile = undefined;
      }

      const currentPath = userPathBasePathLess(uri.fsPath);
      const { badge, color } = getResultColorBadge(currentPath, pathColors, {
        entryIsFile,
      });

      return new vscode.FileDecoration(
        badge,
        "",
        color ? new vscode.ThemeColor(color) : ""
      );
    },
  };

  colorDisposable = vscode.window.registerFileDecorationProvider(provider);
};
