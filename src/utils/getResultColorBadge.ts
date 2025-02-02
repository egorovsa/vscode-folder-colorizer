import vscode from "vscode";
import { checkFileColorOrBadge } from "./checkFileColorOrBadge";
import { userPathBasePathLess } from "./userPathLessPath";
import { checkFilesExtColorOrBadge } from "./checkFilesExtColorOrBadge";
import { checkPathColorOrBadge } from "./checkPathColorOrBadge";
import { PathColors } from "../types";

export const getResultColorBadge = (path: string, pathColors: PathColors[]) => {
  const currentPath = path;
  const fileData = checkFileColorOrBadge(currentPath, pathColors);

  if (fileData.color && fileData.badge) {
    return {
      badge: fileData.badge,
      color: fileData.color,
    };
  }

  const extFileData = checkFilesExtColorOrBadge(currentPath, pathColors);

  if (extFileData.color && extFileData.badge) {
    return {
      badge: extFileData.badge,
      color: extFileData.color,
    };
  }

  const pathData = checkPathColorOrBadge(currentPath, pathColors);

  const badge = fileData.badge || extFileData.badge || pathData.badge;
  const color = fileData.color || extFileData.color || pathData.color;

  return {
    badge,
    color,
  };
};
