import React from "react";
import { PathColorItem } from "../types";

interface IndexedRule {
  item: PathColorItem;
  index: number;
}

interface UsePathRulesResult {
  folderRules: IndexedRule[];
  fileRules: IndexedRule[];
  extensionRules: IndexedRule[];
}

const isFilePathRule = (folderPath: string): boolean => {
  const normalizedPath = folderPath.replace(/[\\/]+$/, "");
  const fileName = normalizedPath.split(/[\\/]/).pop() || "";
  const extensionIndex = fileName.lastIndexOf(".");

  return extensionIndex > 0;
};

export const usePathRules = (pathColors: PathColorItem[]): UsePathRulesResult => {
  return React.useMemo(() => {
    const indexedRules = pathColors.map((item, index) => ({ item, index }));

    return {
      folderRules: indexedRules.filter(
        (rule) =>
          !rule.item.isForExtension &&
          !rule.item.isForFile &&
          !isFilePathRule(rule.item.folderPath)
      ),
      fileRules: indexedRules.filter(
        (rule) =>
          !rule.item.isForExtension &&
          (rule.item.isForFile || isFilePathRule(rule.item.folderPath))
      ),
      extensionRules: indexedRules.filter((rule) => rule.item.isForExtension),
    };
  }, [pathColors]);
};
