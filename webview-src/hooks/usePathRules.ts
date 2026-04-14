import React from "react";
import { PathColorItem } from "../types";

interface IndexedRule {
  item: PathColorItem;
  index: number;
}

interface UsePathRulesResult {
  folderRules: IndexedRule[];
  extensionRules: IndexedRule[];
}

export const usePathRules = (pathColors: PathColorItem[]): UsePathRulesResult => {
  return React.useMemo(() => {
    const indexedRules = pathColors.map((item, index) => ({ item, index }));

    return {
      folderRules: indexedRules.filter((rule) => !rule.item.isForExtension),
      extensionRules: indexedRules.filter((rule) => rule.item.isForExtension),
    };
  }, [pathColors]);
};
