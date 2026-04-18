import * as vscode from "vscode";
import { PathColorRule } from "../types";
import { migrateLegacyPathColors } from "./migrateLegacyPathColors";

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

export function getConfigPathColors(): PathColorRule[] {
  const config = getConfig();
  const useGlobalSettings = getUseGlobalSettings();
  const inspected = config.inspect<unknown[]>("pathColors");

  if (!inspected) {
    return [];
  }

  const raw = useGlobalSettings
    ? inspected.globalValue
    : inspected.workspaceValue || inspected.workspaceFolderValue;

  return migrateLegacyPathColors(raw || []);
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
  pathColors: PathColorRule[]
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
