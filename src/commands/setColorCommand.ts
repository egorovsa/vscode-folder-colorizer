import * as vscode from "vscode";
import { getColorOptions, userPathBasePathLess } from "../utils";
import { changeConfig } from "../utils/changeConfig";

export const setColorCommand = (context: vscode.ExtensionContext) => {
  return (c1: vscode.Uri, context2: vscode.Uri[]) => {
    const options = getColorOptions(context);

    vscode.window
      .showQuickPick(options, {
        placeHolder: "Choose a color: ",
      })
      .then((selected) => {
        if (!selected) {
          return;
        }

        vscode.window
          .showInformationMessage(
            "Do you want to set the color for?",
            {
              modal: true,
              detail: "Test message",
            },
            "This folder and children",
            "This folder only"
          )
          .then((button) => {
            if (button === "This folder only") {
              // changeConfig({
              //   folderPath: [userPathLessPath(context2[0].fsPath)],
              //   color: selected.description,
              // });
            } else if (button === "This folder and children") {
              changeConfig({
                folderPath: context2.map((item) =>
                  userPathBasePathLess(item.fsPath)
                ),
                color: selected.description,
              });
            }
          });

        // changeConfig({
        //   folderPath: context2.map((item) => userPathLessPath(item.fsPath)),
        //   color: selected.description,
        // });
      });
  };
};
