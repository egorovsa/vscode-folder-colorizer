import * as vscode from "vscode";
import { getIconPath } from "./getIconPath";
import colors from "../lists/colors.json";

export const getColorOptions = (context: vscode.ExtensionContext) => {
  return colors.map(({ id, description, defaults }) => ({
    label: description,
    description: id,
    iconPath: getIconPath(context, defaults.dark),
  }));
};
