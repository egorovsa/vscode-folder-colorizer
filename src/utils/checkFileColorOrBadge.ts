import { IFind, PathColors } from "../types";

const normalizePath = (value: string): string => value.replace(/[\\/]+$/, "");

const isFilePath = (value: string): boolean => {
  const normalized = normalizePath(value);
  const fileName = normalized.split(/[\\/]/).pop() || "";
  const extensionIndex = fileName.lastIndexOf(".");

  return extensionIndex > 0;
};

export const checkFileColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const isFile = isFilePath(path);

  if (!isFile) {
    return {
      badge: "",
      color: "",
    };
  }

  const normalizedPath = normalizePath(path);
  const result = pathColors.find(
    (item) => normalizePath(item.folderPath) === normalizedPath
  );

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};
