import * as vscode from "vscode";
import { PathColors } from "../types";

export function getConfig() {
  return vscode.workspace.getConfiguration("folder-color");
}

export function getUseGlobalSettings() {
  const config = getConfig();
  return config.get<boolean>("useGlobalSettings", false);
}

export function updateUseGlobalSettings(value: boolean): Thenable<void> {
  const config = getConfig();
  return config.update(
    "useGlobalSettings",
    value,
    vscode.ConfigurationTarget.Global
  );
}

export function getConfigPathColors() {
  const config = getConfig();
  const useGlobalSettings = getUseGlobalSettings();
  const inspected = config.inspect<PathColors[]>("pathColors");

  if (!inspected) {
    return [];
  }

  if (useGlobalSettings) {
    return inspected.globalValue || [];
  }

  return inspected.workspaceValue || inspected.workspaceFolderValue || [];
}

export function getFavoriteColors() {
  const config = getConfig();
  const useGlobalSettings = getUseGlobalSettings();
  const inspected = config.inspect<string[]>("favoriteColors");

  if (!inspected) {
    return [];
  }

  if (useGlobalSettings) {
    return inspected.globalValue || [];
  }

  return inspected.workspaceValue || inspected.workspaceFolderValue || [];
}

export function updateConfigPathColors(
  pathColors: PathColors[]
): Thenable<void> {
  const config = getConfig();
  const useGlobalSettings = getUseGlobalSettings();
  const target = useGlobalSettings
    ? vscode.ConfigurationTarget.Global
    : vscode.ConfigurationTarget.Workspace;

  return config.update("pathColors", pathColors, target);
}

export function updateFavoriteColors(
  favoriteColors: string[]
): Thenable<void> {
  const config = getConfig();
  const useGlobalSettings = getUseGlobalSettings();
  const target = useGlobalSettings
    ? vscode.ConfigurationTarget.Global
    : vscode.ConfigurationTarget.Workspace;

  return config.update("favoriteColors", favoriteColors, target);
}
