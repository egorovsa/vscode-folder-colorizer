import { PathColorRule, PathsColorPatch } from "../types";
import { getConfigPathColors } from "./useConfig";

const normalizeTrailingSlashes = (value: string): string =>
  value.replace(/[\\/]+$/, "");

const normalizeExtensionToken = (value: string): string =>
  value.trim().replace(/^\./, "").toLowerCase();

const findRuleIndex = (
  rules: PathColorRule[],
  patch: PathsColorPatch,
  valueItem: string
): number => {
  return rules.findIndex((item) => {
    if (patch.ruleType === "extension") {
      const token = normalizeExtensionToken(valueItem);
      return (
        Boolean(item.extension) &&
        normalizeExtensionToken(item.extension || "") === token
      );
    }

    if (patch.ruleType === "file") {
      const normalizedValue = normalizeTrailingSlashes(valueItem);
      return (
        Boolean(item.filePath) &&
        normalizeTrailingSlashes(item.filePath || "") === normalizedValue
      );
    }

    if (patch.isFolderOnly !== undefined) {
      const folderOnlyPatch = Boolean(patch.isFolderOnly);
      const folderOnlyItem = Boolean(item.isFolderOnly);
      if (folderOnlyPatch !== folderOnlyItem) {
        return false;
      }
    }

    return (
      Boolean(item.folderPath) &&
      !item.filePath &&
      !item.extension &&
      item.folderPath === valueItem
    );
  });
};

export const getUpdatedPathColors = (
  patch: PathsColorPatch,
  toRemove = false
): PathColorRule[] => {
  const configRules = [...getConfigPathColors()];

  patch.values.forEach((valueItem) => {
    const existingIndex = findRuleIndex(configRules, patch, valueItem);

    if (existingIndex > -1 && toRemove) {
      configRules.splice(existingIndex, 1);
      return;
    }

    if (existingIndex > -1 && !toRemove) {
      const existing = configRules[existingIndex];
      existing.color = patch.color || existing.color;
      existing.badge = patch.badge || existing.badge;

      if (patch.ruleType === "folder") {
        existing.isFolderOnly = patch.isFolderOnly || existing.isFolderOnly;
      }
      return;
    }

    if (existingIndex === -1 && !toRemove) {
      if (patch.ruleType === "extension") {
        configRules.push({
          extension: normalizeExtensionToken(valueItem),
          ...(patch.color && { color: patch.color }),
          ...(patch.badge && { badge: patch.badge }),
        });
        return;
      }

      if (patch.ruleType === "file") {
        configRules.push({
          filePath: normalizeTrailingSlashes(valueItem),
          ...(patch.color && { color: patch.color }),
          ...(patch.badge && { badge: patch.badge }),
        });
        return;
      }

      configRules.push({
        folderPath: valueItem,
        ...(patch.color && { color: patch.color }),
        ...(patch.badge && { badge: patch.badge }),
        ...(patch.isFolderOnly && { isFolderOnly: patch.isFolderOnly }),
      });
    }
  });

  return configRules;
};
