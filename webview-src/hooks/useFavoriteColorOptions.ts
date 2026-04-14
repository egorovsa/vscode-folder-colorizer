import React from "react";
import { ColorOption } from "../types";

interface ColorGroup {
  name: string;
  options: ColorOption[];
}

interface UseFavoriteColorOptionsResult {
  favoriteOptions: ColorOption[];
  filteredRegularOptions: ColorOption[];
  groupedRegularOptions: ColorGroup[];
}

const normalize = (value: string): string => value.trim().toLowerCase();

export const useFavoriteColorOptions = (
  colorOptions: ColorOption[],
  favoriteColors: string[],
  favoriteFilter: string
): UseFavoriteColorOptionsResult => {
  return React.useMemo(() => {
    const favoriteSet = new Set(favoriteColors.map((item) => normalize(item)));
    const favoriteOptions = colorOptions.filter((option) =>
      favoriteSet.has(normalize(option.id))
    );
    const regularOptions = colorOptions.filter(
      (option) => !favoriteSet.has(normalize(option.id))
    );
    const query = favoriteFilter.trim().toLowerCase();
    const filteredRegularOptions = regularOptions.filter((option) => {
      if (!query) {
        return true;
      }

      return (
        option.description.toLowerCase().includes(query) ||
        option.id.toLowerCase().includes(query)
      );
    });

    const groupedRegularOptions = filteredRegularOptions
      .reduce((acc, option) => {
        const groupName = option.group?.trim() || "Other";
        const existingGroup = acc.find((group) => group.name === groupName);

        if (existingGroup) {
          existingGroup.options.push(option);
        } else {
          acc.push({
            name: groupName,
            options: [option],
          });
        }

        return acc;
      }, [] as ColorGroup[])
      .sort((groupA, groupB) => groupA.name.localeCompare(groupB.name));

    return {
      favoriteOptions,
      filteredRegularOptions,
      groupedRegularOptions,
    };
  }, [colorOptions, favoriteColors, favoriteFilter]);
};
