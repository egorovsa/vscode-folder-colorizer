import vscode from "vscode";
import { checkFileColorOrBadge } from "./checkFileColorOrBadge";
import { userPathBasePathLess } from "./userPathLessPath";
import { checkFilesExtColorOrBadge } from "./checkFilesExtColorOrBadge";
import { checkPathColorOrBadge } from "./checkPathColorOrBadge";
import { PathColors } from "../types";

export const getResultColorBadge = (path: string, pathColors: PathColors[]) => {
  const currentPath = userPathBasePathLess(path);
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

  console.log(pathData, currentPath);

  const badge = fileData.badge || extFileData.badge || pathData.badge;
  const color = fileData.color || extFileData.color || pathData.color;

  return {
    badge,
    color,
  };
};
