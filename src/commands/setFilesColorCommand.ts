import * as vscode from "vscode";
import {
  getColorOptions,
  normalizeFileRulePath,
  userPathBasePathLess,
} from "../utils";
import { patchConfig } from "../utils/patchConfig";

export const setFilesColorCommand = (context: vscode.ExtensionContext) => {
  return async (uri: vscode.Uri, uriArray: vscode.Uri[] = []) => {
    const options = getColorOptions(context);

    const selected = await vscode.window.showQuickPick(options, {
      placeHolder: "Choose a color: ",
    });

    if (!selected) {
      return;
    }

    const selectedUris = uriArray.length ? uriArray : [uri];
    const filePaths = selectedUris.map((item) =>
      normalizeFileRulePath(userPathBasePathLess(item.fsPath))
    );

    patchConfig({
      folderPath: filePaths,
      color: selected.description,
    });
  };
};
