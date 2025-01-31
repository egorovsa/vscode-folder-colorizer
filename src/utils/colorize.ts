import * as vscode from "vscode";
import { getPathColors } from "./useConfig";
import { userPathBasePathLess } from "./userPathLessPath";
import { checkPathColorOrBadge } from "./checkPathColorOrBadge";

export let colorDisposable: vscode.Disposable;

export const colorize = () => {
  colorDisposable?.dispose();

  let pathColors = getPathColors();

  let provider: vscode.FileDecorationProvider = {
    provideFileDecoration: (
      uri: vscode.Uri,
      token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.FileDecoration> => {
      const currentPath = userPathBasePathLess(uri.fsPath);
      const { badge, color } = checkPathColorOrBadge(currentPath, pathColors);

      return new vscode.FileDecoration(
        badge,
        "",
        color ? new vscode.ThemeColor(color) : ""
      );
    },
  };

  colorDisposable = vscode.window.registerFileDecorationProvider(provider);
};
