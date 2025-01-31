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

  const bestFit = matchingPaths[0];
  const bestFitColor = !bestFit?.isForExtension && bestFit?.color;
  const bestFitBadge = bestFit?.badge;

  return {
    badge: bestFitBadge || "",
    color: bestFitColor || "",
  };
};
