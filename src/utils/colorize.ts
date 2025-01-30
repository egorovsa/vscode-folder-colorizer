import * as vscode from "vscode";
import { getPathColors } from "./useConfig";
import { userPathBasePathLess } from "./userPathLessPath";
import { PathColors } from "../types";

export let colorDisposable: vscode.Disposable;

interface IFind {
  color: string;
  badge: string;
}

const checkFileColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const result = pathColors.find((item) => item.folderPath === path);

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};

const checkFilesExtColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const isFile = path.includes(".");
  const fileExtension = isFile ? path.replace(/\/$/, "").split(".").pop() : "";

  const result = pathColors.find(
    (item) => item.isForExtension && item.folderPath === fileExtension
  );

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};

const checkPathColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const matchingPaths = pathColors
    .filter((item) => {
      return path.includes(item.folderPath);
    })
    .sort((a, b) => b.folderPath.length - a.folderPath.length);

  const bestFit = matchingPaths[0];
  const bestFitColor = !bestFit.isForExtension && bestFit?.color;
  const bestFitBadge = bestFit?.badge;

  return {
    badge: bestFitBadge || "",
    color: bestFitColor || "",
  };
};

export const colorize = () => {
  if (colorDisposable) {
    colorDisposable.dispose();
  }

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

      // console.log({ badge, color });

      return new vscode.FileDecoration(
        badge,
        "",
        color ? new vscode.ThemeColor(color) : ""
      );

      // const isFile = currentPath.includes(".");
      // const fileExtension = isFile ? uri.fsPath.split(".").pop() : "";

      // const matchingPaths = pathColors
      //   .filter((item) => {
      //     return !item.isForExtension && currentPath.includes(item.folderPath);
      //   })
      //   .sort((a, b) => b.folderPath.length - a.folderPath.length);

      // const matchingExt = pathColors.find((item) => {
      //   return item.isForExtension && item.folderPath === fileExtension;
      // });

      // const bestFit = matchingPaths[0];
      // const bestFitColor = matchingPaths[0]?.color;
      // const bestFitBadge = matchingPaths[0]?.badge;

      // const newColor = bestFitColor
      //   ? new vscode.ThemeColor(bestFitColor)
      //   : undefined;

      // const newBadge = bestFitBadge ? bestFitBadge : undefined;

      // if (bestFit) {
      //   return new vscode.FileDecoration(newBadge, "", newColor);
      // }

      // return new vscode.FileDecoration();
    },
  };

  colorDisposable = vscode.window.registerFileDecorationProvider(provider);
};
