import * as vscode from "vscode";
import { PathColors } from "../types";

export function getConfig() {
  return vscode.workspace.getConfiguration("folder-color");
}

export function getPathColors() {
  const config = getConfig();
  return (config.get("pathColors") || []) as PathColors[];
}

export function updateConfigPathColors(pathColors: PathColors[]) {
  const config = getConfig();
  config.update("pathColors", pathColors);
}
