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

export const usePathRules = (pathColors: PathColorItem[]): UsePathRulesResult => {
  return React.useMemo(() => {
    const indexedRules = pathColors.map((item, index) => ({ item, index }));

    return {
      folderRules: indexedRules.filter(
        (rule) =>
          rule.item.folderPath !== undefined &&
          rule.item.filePath === undefined &&
          rule.item.extension === undefined
      ),
      fileRules: indexedRules.filter(
        (rule) =>
          rule.item.filePath !== undefined &&
          rule.item.folderPath === undefined &&
          rule.item.extension === undefined
      ),
      extensionRules: indexedRules.filter(
        (rule) =>
          rule.item.extension !== undefined &&
          rule.item.folderPath === undefined &&
          rule.item.filePath === undefined
      ),
    };
  }, [pathColors]);
};
