import * as vscode from "vscode";

/**
 * Removes the base path from a given path, leaving only the relative path within the workspace.
 *
 * @param path - The full path to be processed.
 * @returns The path relative to the workspace root.
 *
 * @remarks
 * This function checks if the provided path is a Windows path or a Unix-like path.
 * It then removes the base path up to the workspace name, returning the relative path.
 *
 * @example
 * ```typescript
 * const fullPath = "/Users/username/Work/folder-colorizer/src/utils/userPathLessPath.ts";
 * const relativePath = userPathBasePathLess(fullPath);
 * console.log(relativePath); // "folder-colorizer/src/utils/userPathLessPath.ts/"
 * ```
 */
export const userPathBasePathLess = (path: string): string => {
  const isWindowsPath = path.includes(":\\");
  const workspace = vscode?.workspace?.workspaceFolders?.[0];

  if (isWindowsPath) {
    return path.replace(new RegExp(`.*\(${workspace?.name})`), "$1") + "\\";
  }

  return path.replace(new RegExp(`.*\/(${workspace?.name})`), "$1") + "/";
};
