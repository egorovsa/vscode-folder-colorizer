import { IFind, PathColors } from "../types";

export const checkFilesExtColorOrBadge = (
  path: string,
  pathColors: PathColors[]
): IFind => {
  const isFile = path.includes(".");
  const fileExtension = isFile ? path.replace(/\/$/, "").split(".").pop() : "";

  const result = pathColors.find(
    (item) => item.isForExtension && item.folderPath === fileExtension
  );

  return {
    badge: result?.badge || "",
    color: result?.color || "",
  };
};
