import * as vscode from "vscode";

export function checkIfItFirstTimeRun(context: vscode.ExtensionContext) {
  const firstTimeRunFlag = "FOLDER_COLORIZER_FIRST_TIME_RUN1";

  if (context.globalState.get(firstTimeRunFlag, true)) {
    vscode.window
      .showInformationMessage(
        "To activate folder colors feature in VSCode, please reload the editor now.",
        "Reload"
      )
      .then((selection) => {
        if (selection === "Reload") {
          vscode.commands.executeCommand("workbench.action.reloadWindow");
        }
      });

    context.globalState.update(firstTimeRunFlag, false);
  }
}
