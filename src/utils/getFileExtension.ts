export const getFileExtension = (filePath: string): string => {
  const normalizedPath = filePath.replace(/[\\/]+$/, "");
  const fileName = normalizedPath.split(/[\\/]/).pop() || "";
  const extensionIndex = fileName.lastIndexOf(".");

  if (extensionIndex <= 0) {
    return "";
  }

  return fileName.slice(extensionIndex + 1);
};
