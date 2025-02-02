import * as vscode from "vscode";
import { getConfigPathColors } from "./useConfig";
import { userPathBasePathLess } from "./userPathLessPath";
import { getResultColorBadge } from "./getResultColorBadge";

export let colorDisposable: vscode.Disposable;

export const colorize = () => {
  colorDisposable?.dispose();

  let pathColors = getConfigPathColors();

  let provider: vscode.FileDecorationProvider = {
    provideFileDecoration: (
      uri: vscode.Uri,
      token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.FileDecoration> => {
      const currentPath = userPathBasePathLess(uri.fsPath);
      const { badge, color } = getResultColorBadge(currentPath, pathColors);

      return new vscode.FileDecoration(
        badge,
        "",
        color ? new vscode.ThemeColor(color) : ""
      );
    },
  };

  colorDisposable = vscode.window.registerFileDecorationProvider(provider);
};
