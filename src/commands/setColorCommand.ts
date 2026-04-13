import * as vscode from "vscode";
import {
  filterIncludedPaths,
  getColorOptions,
  userPathBasePathLess,
} from "../utils";
import { patchConfig } from "../utils/patchConfig";

export const setColorCommand = (context: vscode.ExtensionContext) => {
  return async (c1: vscode.Uri, context2: vscode.Uri[]) => {
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
      "This folder only"
    );

    const preparedPaths = context2.map((item) =>
      userPathBasePathLess(item.fsPath)
    );

    const folderPath = filterIncludedPaths(preparedPaths);

    if (button === "This folder only") {
      patchConfig({
        folderPath,
        color: selected.description,
        isFolderOnly: true,
      });
    } else if (button === "This folder and children") {
      patchConfig({
        folderPath,
        color: selected.description,
      });
    }

    // changeConfig({
    //   folderPath: context2.map((item) => userPathLessPath(item.fsPath)),
    //   color: selected.description,
    // });
  };
};
