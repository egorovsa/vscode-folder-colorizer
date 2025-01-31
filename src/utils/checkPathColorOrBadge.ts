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
    ({ color, isForExtension }) => color && !isForExtension
  )?.color;

  const bestFitBadge = matchingPaths.find(
    ({ badge, isForExtension }) => badge && !isForExtension
  )?.badge;

  return {
    badge: bestFitBadge || "",
    color: bestFitColor || "",
  };
};
