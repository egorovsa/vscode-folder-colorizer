import path from "path";
import * as vscode from "vscode";

export function getIconPath(context: vscode.ExtensionContext, color: string) {
  const fileName = color.replace("#", "color_");

  return vscode.Uri.file(
    path.join(context.extensionPath, "resources", "icons", `${fileName}.svg`)
  );
}
