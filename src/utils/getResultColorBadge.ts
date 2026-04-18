import {
  checkFileColorOrBadge,
  CheckFileColorOrBadgeOptions,
} from "./checkFileColorOrBadge";
import { checkFilesExtColorOrBadge } from "./checkFilesExtColorOrBadge";
import { checkFolderOnlyColorOrBadge } from "./checkFolderOnlyColorOrBadge";
import { checkPathColorOrBadge } from "./checkPathColorOrBadge";
import { PathColorRule } from "../types";

export type GetResultColorBadgeOptions = CheckFileColorOrBadgeOptions;

export const getResultColorBadge = (
  path: string,
  pathColors: PathColorRule[],
  options?: GetResultColorBadgeOptions
) => {
  const currentPath = path;
  const fileData = checkFileColorOrBadge(currentPath, pathColors, options);

  if (fileData.color && fileData.badge) {
    return {
      badge: fileData.badge,
      color: fileData.color,
    };
  }

  const extFileData = checkFilesExtColorOrBadge(currentPath, pathColors);
  const folderOnlyData = checkFolderOnlyColorOrBadge(currentPath, pathColors);

  if (extFileData.color && extFileData.badge) {
    return {
      badge: extFileData.badge,
      color: extFileData.color,
    };
  }

  const pathData = checkPathColorOrBadge(currentPath, pathColors);

  const badge =
    fileData.badge ||
    extFileData.badge ||
    folderOnlyData.badge ||
    pathData.badge;
  const color =
    fileData.color ||
    extFileData.color ||
    folderOnlyData.color ||
    pathData.color;

  return {
    badge,
    color,
  };
};
