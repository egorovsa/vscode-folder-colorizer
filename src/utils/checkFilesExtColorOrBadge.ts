import { IFind, PathColorRule } from "../types";
import { getFileExtension } from "./getFileExtension";

export const checkFilesExtColorOrBadge = (
  path: string,
  pathColors: PathColorRule[]
): IFind => {
  const fileExtension = getFileExtension(path);

  const result = pathColors.find(
    (item) =>
      Boolean(item.extension) &&
      item.extension === fileExtension
  );

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};
