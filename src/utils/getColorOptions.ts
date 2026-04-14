import * as vscode from "vscode";
import { getIconPath } from "./getIconPath";
import { getContributedColors } from "./getContributedColors";

export const getColorOptions = (context: vscode.ExtensionContext) => {
  return getContributedColors(context).map(({ id, description, defaults }) => ({
    label: description,
    description: id,
    iconPath: getIconPath(context, defaults.dark),
  }));
};
