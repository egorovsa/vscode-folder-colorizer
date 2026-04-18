import vscode from "vscode";
import {
  colorize,
  getConfigPathColors,
  updateConfigPathColors,
  userPathBasePathLess,
} from "../utils";
import { PathColorRule } from "../types";

const normalizePath = (value: string): string => value.replace(/[\\/]+$/, "");

export const registerRenameHandler = () => {
  vscode.workspace.onDidRenameFiles((event) => {
    const updatedPathColors = event.files.reduce(
      (acc, { oldUri, newUri }) => {
        const oldPath = normalizePath(userPathBasePathLess(oldUri.fsPath));
        const newPath = normalizePath(userPathBasePathLess(newUri.fsPath));

        return acc.map<PathColorRule>((item) => {
          if (item.filePath && normalizePath(item.filePath) === oldPath) {
            return { ...item, filePath: newPath };
          }

          if (item.folderPath && normalizePath(item.folderPath) === oldPath) {
            return { ...item, folderPath: newPath };
          }

          return item;
        });
      },
      [...getConfigPathColors()]
    );

    updateConfigPathColors(updatedPathColors);
    colorize();
  });
};
