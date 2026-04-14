import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

interface ContributedColor {
  id: string;
  description: string;
  group?: string;
  defaults: {
    dark: string;
    light: string;
    highContrast: string;
    highContrastLight: string;
  };
}

interface PackageJsonLike {
  contributes?: {
    colors?: unknown[];
  };
}

const isContributedColor = (item: unknown): item is ContributedColor => {
  if (!item || typeof item !== "object") {
    return false;
  }

  const value = item as Partial<ContributedColor>;
  return (
    typeof value.id === "string" &&
    typeof value.description === "string" &&
    typeof value.defaults?.dark === "string" &&
    typeof value.defaults?.light === "string" &&
    typeof value.defaults?.highContrast === "string" &&
    typeof value.defaults?.highContrastLight === "string"
  );
};

export const getContributedColors = (
  context: vscode.ExtensionContext
): ContributedColor[] => {
  try {
    const packageJsonPath = path.join(context.extensionPath, "package.json");
    const raw = fs.readFileSync(packageJsonPath, "utf8");
    const parsed = JSON.parse(raw) as PackageJsonLike;
    const colors = parsed.contributes?.colors ?? [];

    return colors.filter(isContributedColor);
  } catch {
    return [];
  }
};
