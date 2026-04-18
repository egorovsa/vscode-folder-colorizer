import { IFind, PathColorRule } from "../types";

export const checkPathColorOrBadge = (
  path: string,
  pathColors: PathColorRule[]
): IFind => {
  const matchingPaths = pathColors
    .filter((item) => {
      if (!item.folderPath || item.filePath || item.extension) {
        return false;
      }
      return path.includes(item.folderPath);
    })
    .sort((a, b) => (b.folderPath || "").length - (a.folderPath || "").length);

  const bestFitColor = matchingPaths.find(
    ({ color, isFolderOnly }) => Boolean(color) && !isFolderOnly
  )?.color;

  const bestFitBadge = matchingPaths.find(
    ({ badge, isFolderOnly }) => Boolean(badge) && !isFolderOnly
  )?.badge;

  return {
    badge: bestFitBadge || "",
    color: bestFitColor || "",
  };
};
