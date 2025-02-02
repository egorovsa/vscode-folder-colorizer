import { PathColors, PathsColors } from "../types";
import { getConfigPathColors } from "./useConfig";

const getExistingIndex = (
  pathItem: string,
  configPathColors: PathColors[],
  pathColor: Partial<PathsColors>
) => {
  return configPathColors?.findIndex((item) => {
    const withFolderOnly =
      (item.isFolderOnly || false) === (pathColor.isFolderOnly || false);

    const withIsExtension =
      (item.isForExtension || false) === (pathColor.isForExtension || false);

    return item.folderPath === pathItem && withFolderOnly && withIsExtension;
  });
};

export const getUpdatedPathColors = (
  pathColor: Partial<PathsColors>,
  toRemove = false
): PathColors[] => {
  const configPathColors = [...getConfigPathColors()];

  pathColor.folderPath?.forEach((pathItem) => {
    const existingIndex = getExistingIndex(
      pathItem,
      configPathColors,
      pathColor
    );

    // REMOVE PATH
    if (existingIndex > -1 && toRemove) {
      configPathColors.splice(existingIndex, 1);
      return;
    }

    // CREATE NEW PATH
    if (existingIndex === -1) {
      configPathColors.push({
        folderPath: pathItem,
        ...(pathColor.color && { color: pathColor.color }),
        ...(pathColor.badge && { badge: pathColor.badge }),
        ...(pathColor.isForExtension && {
          isForExtension: pathColor.isForExtension,
        }),
        ...(pathColor.isFolderOnly && {
          isFolderOnly: pathColor.isFolderOnly,
        }),
      });

      return;
    }

    // UPDATE CURRENT PATH
    const existingPath = configPathColors[existingIndex];

    existingPath.color = pathColor.color || existingPath.color;
    existingPath.badge = pathColor.badge || existingPath.badge;

    existingPath.isForExtension =
      pathColor.isForExtension || existingPath.isForExtension;

    existingPath.isFolderOnly =
      pathColor.isFolderOnly || existingPath.isFolderOnly;
  });

  return configPathColors;
};
