import * as vscode from "vscode";
import { getColorOptions, getFileExtension } from "../utils";
import { patchConfig } from "../utils/patchConfig";

export const setColorFileExtCommand = (context: vscode.ExtensionContext) => {
  return (uri: vscode.Uri, uriArray: vscode.Uri[] = []) => {
    const fileExtension = getFileExtension(uri.fsPath);

    if (!fileExtension) {
      vscode.window.showWarningMessage("Only files can be selected");
      return;
    }

    const selectedUris = uriArray.length ? uriArray : [uri];

    if (selectedUris.length > 1) {
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

        patchConfig({
          folderPath: [fileExtension],
          color: selected.description,
          isForExtension: true,
        });
      });
  };
};
