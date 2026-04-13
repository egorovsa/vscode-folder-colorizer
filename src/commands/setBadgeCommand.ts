import * as vscode from "vscode";
import { patchConfig } from "../utils/patchConfig";
import { userPathBasePathLess } from "../utils";

export const setBadgeCommand = (_: vscode.Uri, uriArray: vscode.Uri[]) => {
  vscode.window
    .showInputBox({
      prompt: "Set folder badge",
      placeHolder: "WS",
      validateInput: (text: string): string | null => {
        if (text.length > 2) {
          return "Must be no more than 2 symbols";
        }

        return null;
      },
    })
    .then((value) => {
      if (!value) {
        return;
      }

      patchConfig({
        folderPath: uriArray.map((item) => userPathBasePathLess(item.fsPath)),
        badge: value,
      });
    });
};
