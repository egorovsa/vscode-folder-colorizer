import * as vscode from "vscode";
import {
  filterIncludedPaths,
  getColorOptions,
  userPathBasePathLess,
} from "../utils";
import { patchConfig } from "../utils/patchConfig";

export const setColorCommand = (context: vscode.ExtensionContext) => {
  return async (_uri: vscode.Uri, context2: vscode.Uri[]) => {
    const options = getColorOptions(context);

    const selected = await vscode.window.showQuickPick(options, {
      placeHolder: "Choose a color: ",
    });

    if (!selected) {
      return;
    }

    const button = await vscode.window.showInformationMessage(
      "Do you want to set the color for?",
      {
        modal: true,
        detail: "Test message",
      },
      "This folder and children",
      "This folder only",
    );

    const preparedPaths = context2.map((item) =>
      userPathBasePathLess(item.fsPath),
    );

    const values = filterIncludedPaths(preparedPaths);

    if (button === "This folder only") {
      patchConfig({
        ruleType: "folder",
        values,
        color: selected.description,
        isFolderOnly: true,
      });
    } else if (button === "This folder and children") {
      patchConfig({
        ruleType: "folder",
        values,
        color: selected.description,
      });
    }
  };
};
