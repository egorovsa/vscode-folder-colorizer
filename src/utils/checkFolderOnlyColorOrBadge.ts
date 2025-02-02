import { IFind, PathColors } from "../types";

export const checkFolderOnlyColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const result = pathColors.find(
    (item) => item.isFolderOnly && item.folderPath === path
  );

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};
