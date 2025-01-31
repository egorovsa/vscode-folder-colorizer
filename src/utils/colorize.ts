import * as vscode from "vscode";
import { getPathColors } from "./useConfig";
import { userPathBasePathLess } from "./userPathLessPath";
import { checkPathColorOrBadge } from "./checkPathColorOrBadge";
import { checkFilesExtColorOrBadge } from "./checkFilesExtColorOrBadge";
import { checkFileColorOrBadge } from "./checkFileColorOrBadge";

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
      const fileData = checkFileColorOrBadge(currentPath, pathColors);

      if (fileData.color && fileData.badge) {
        return new vscode.FileDecoration(
          fileData.badge,
          "",
          new vscode.ThemeColor(fileData.color)
        );
      }

      const extFileData = checkFilesExtColorOrBadge(currentPath, pathColors);

      if (extFileData.color && extFileData.badge) {
        return new vscode.FileDecoration(
          fileData.badge || extFileData.badge,
          "",
          new vscode.ThemeColor(fileData.color || extFileData.color)
        );
      }

      const pathData = checkPathColorOrBadge(currentPath, pathColors);
      const badge = fileData.badge || extFileData.badge || pathData.badge;
      const color = fileData.color || extFileData.color || pathData.color;

      return new vscode.FileDecoration(
        badge,
        "",
        color ? new vscode.ThemeColor(color) : ""
      );
    },
  };

  colorDisposable = vscode.window.registerFileDecorationProvider(provider);
};
