import { IFind, PathColors } from "../types";

export const checkFileColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const isFile = path.includes(".");

  if (!isFile) {
    return {
      badge: "",
      color: "",
    };
  }

  const result = pathColors.find((item) => item.folderPath === path);

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};
