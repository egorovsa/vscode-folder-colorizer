import { getFileExtension } from "./getFileExtension";

const KNOWN_DOT_DIRECTORY_NAMES = new Set([
  ".git",
  ".svn",
  ".hg",
  ".vscode",
  ".github",
  ".idea",
  ".vs",
  ".devcontainer",
  ".cursor",
  ".yarn",
]);

/**
 * Heuristic for Control Panel grouping only. Dot-directories like `.vscode`
 * are treated as folders; dotfiles like `.htaccess` are treated as files.
 */
export const isLikelyFilePathRule = (folderPath: string): boolean => {
  const normalizedPath = folderPath.replace(/[\\/]+$/, "");
  const fileName = normalizedPath.split(/[\\/]/).pop() || "";

  if (!fileName || fileName === "." || fileName === "..") {
    return false;
  }

  if (KNOWN_DOT_DIRECTORY_NAMES.has(fileName.toLowerCase())) {
    return false;
  }

  return getFileExtension(folderPath) !== "";
};
