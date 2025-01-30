import * as vscode from "vscode";
import { changeConfig, userPathBasePathLess } from "../utils";
import emoji from "../lists/emoji.json";

export const setEmojiBadgeCommand = () => {
  return (_: vscode.Uri, context2: vscode.Uri[]) => {
    vscode.window
      .showQuickPick(
        emoji.map(({ description, emoji }) => ({
          label: emoji,
          description,
        })),
        {
          placeHolder: "Choose emoji badge: ",
        }
      )
      .then((selected) => {
        if (!selected) {
          return;
        }

        changeConfig({
          folderPath: context2.map((item) => userPathBasePathLess(item.fsPath)),
          badge: selected.label,
        });
      });
  };
};
