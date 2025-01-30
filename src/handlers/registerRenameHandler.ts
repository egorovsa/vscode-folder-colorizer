import vscode from "vscode";
import {
  colorize,
  getPathColors,
  updateConfigPathColors,
  userPathBasePathLess,
} from "../utils";
import { PathColors } from "../types";

export const registerRenameHandler = () => {
  vscode.workspace.onDidRenameFiles((event) => {
    const updatedPathColors = event.files.reduce(
      (acc, { oldUri, newUri }) => {
        const oldPath = userPathBasePathLess(oldUri.fsPath);
        const newPath = userPathBasePathLess(newUri.fsPath);

        return acc.map<PathColors>((item) => {
          if (!item.isForExtension && item.folderPath === oldPath) {
            return { ...item, folderPath: newPath };
          }

          return item;
        });
      },
      [...getPathColors()]
    );

    updateConfigPathColors(updatedPathColors);
    colorize();
  });
};
