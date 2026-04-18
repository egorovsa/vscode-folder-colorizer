import { IFind, PathColorRule } from "../types";
import { isLikelyFilePathRule } from "./pathRuleKind";

const normalizePath = (value: string): string => value.replace(/[\\/]+$/, "");

export interface CheckFileColorOrBadgeOptions {
  /**
   * From `vscode.workspace.fs.stat` when decorating a URI: true = file, false = directory.
   * When omitted, matching uses path-string heuristics only (backwards compatible).
   */
  entryIsFile?: boolean;
}

const ruleMatchesExactFileEntry = (
  item: PathColorRule,
  path: string,
  normalizedPath: string,
  entryIsFile: boolean | undefined
): boolean => {
  if (!item.filePath || item.extension || item.folderPath) {
    return false;
  }

  if (normalizePath(item.filePath) !== normalizedPath) {
    return false;
  }

  if (entryIsFile === true) {
    return true;
  }

  if (entryIsFile === false) {
    return false;
  }

  return isLikelyFilePathRule(path);
};

export const checkFileColorOrBadge = (
  path: string,
  pathColors: PathColorRule[],
  options?: CheckFileColorOrBadgeOptions
): IFind => {
  const normalizedPath = normalizePath(path);
  const result = pathColors.find((item) =>
    ruleMatchesExactFileEntry(item, path, normalizedPath, options?.entryIsFile)
  );

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};
