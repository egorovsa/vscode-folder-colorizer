import { IFind, PathColors } from "../types";

export const checkPathColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const matchingPaths = pathColors
    .filter((item) => {
      return path.includes(item.folderPath);
    })
    .sort((a, b) => b.folderPath.length - a.folderPath.length);

  const bestFitColor = matchingPaths.find(
    ({ color, isForExtension, isFolderOnly }) =>
      color && !isForExtension && !isFolderOnly
  )?.color;

  const bestFitBadge = matchingPaths.find(
    ({ badge, isForExtension, isFolderOnly }) =>
      badge && !isForExtension && !isFolderOnly
  )?.badge;

  return {
    badge: bestFitBadge || "",
    color: bestFitColor || "",
  };
};
