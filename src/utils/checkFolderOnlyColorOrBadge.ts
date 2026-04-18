import { IFind, PathColorRule } from "../types";

const normalizePath = (value: string): string => value.replace(/[\\/]+$/, "");

export const checkFolderOnlyColorOrBadge = (
  path: string,
  pathColors: PathColorRule[]
): IFind => {
  const normalizedPath = normalizePath(path);
  const result = pathColors.find(
    (item) =>
      item.isFolderOnly &&
      Boolean(item.folderPath) &&
      normalizePath(item.folderPath || "") === normalizedPath
  );

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};
