export const getFileExtension = (filePath: string): string => {
  const normalizedPath = filePath.replace(/[\\/]+$/, "");
  const fileName = normalizedPath.split(/[\\/]/).pop() || "";

  if (!fileName || fileName === "." || fileName === "..") {
    return "";
  }

  if (fileName.startsWith(".")) {
    const rest = fileName.slice(1);
    if (!rest) {
      return "";
    }
    if (rest.includes(".")) {
      return rest.slice(rest.lastIndexOf(".") + 1);
    }
    return rest;
  }

  const extensionIndex = fileName.lastIndexOf(".");
  if (extensionIndex <= 0) {
    return "";
  }

  return fileName.slice(extensionIndex + 1);
};
