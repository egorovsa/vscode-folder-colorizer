import { IFind, PathColors } from "../types";
import { getFileExtension } from "./getFileExtension";

export const checkFilesExtColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const fileExtension = getFileExtension(path);

  const result = pathColors.find(
    (item) => item.isForExtension && item.folderPath === fileExtension
  );

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};
