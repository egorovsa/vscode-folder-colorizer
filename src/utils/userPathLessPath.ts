import * as vscode from "vscode";

export const userPathLessPath = (path: string) => {
  const isWindowsPath = path.includes(":\\");

  const workspace = vscode?.workspace?.workspaceFolders?.[0];

  if (isWindowsPath) {
    return path.replace(new RegExp(`.*\(${workspace?.name})`), "$1") + "\\";
  }

  return path.replace(new RegExp(`.*\/(${workspace?.name})`), "$1") + "/";
};
