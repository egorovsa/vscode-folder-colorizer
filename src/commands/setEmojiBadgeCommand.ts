import * as vscode from "vscode";
import { patchConfig, userPathBasePathLess } from "../utils";
import emoji from "../lists/emoji.json";

export const setEmojiBadgeCommand = () => {
  return (_: vscode.Uri, context2: vscode.Uri[]) => {
    vscode.window
      .showQuickPick(
        emoji.map((entry) => ({
          label: entry.emoji,
          description: entry.description,
        })),
        {
          placeHolder: "Choose emoji badge: ",
        }
      )
      .then((selected) => {
        if (!selected) {
          return;
        }

        patchConfig({
          ruleType: "folder",
          values: context2.map((item) => userPathBasePathLess(item.fsPath)),
          badge: selected.label,
        });
      });
  };
};
