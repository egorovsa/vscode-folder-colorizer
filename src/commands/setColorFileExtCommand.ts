import * as vscode from "vscode";
import { getColorOptions } from "../utils";
import { changeConfig } from "../utils/changeConfig";

export const setColorFileExtCommand = (context: vscode.ExtensionContext) => {
  return (uri: vscode.Uri, uriArray: vscode.Uri[]) => {
    const fileExtension = uri.fsPath.split(".").pop();

    if (!fileExtension) {
      vscode.window.showWarningMessage("Only files can be selected");
      return;
    }

    if (uriArray.length > 1) {
      vscode.window.showWarningMessage("Only one file can be selected");
      return;
    }

    const options = getColorOptions(context);

    vscode.window
      .showQuickPick(options, {
        placeHolder: "Choose a color: ",
      })
      .then((selected) => {
        if (!selected) {
          return;
        }

        changeConfig({
          folderPath: [fileExtension],
          color: selected.description,
          isForExtension: true,
        });
      });
  };
};
