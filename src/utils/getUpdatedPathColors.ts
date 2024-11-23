import { PathsColors } from "../types";
import { getPathColors } from "./useConfig";

export const getUpdatedPathColors = (
  pathColor: Partial<PathsColors>,
  toRemove = false
) => {
  const pathColors = [...getPathColors()];

  pathColor.folderPath?.forEach((pathItem) => {
    const existingPath = pathColors?.find(
      (item) => item.folderPath === pathItem
    );

    if (toRemove && existingPath) {
      const index = pathColors.indexOf(existingPath);
      pathColors.splice(index, 1);
    } else if (existingPath) {
      existingPath.color = pathColor.color || existingPath.color;
      existingPath.badge = pathColor.badge || existingPath.badge;
    } else {
      pathColors.push({
        folderPath: pathItem,
        ...(pathColor.color && { color: pathColor.color }),
        ...(pathColor.badge && { badge: pathColor.badge }),
      });
    }
  });

  return pathColors;
};
