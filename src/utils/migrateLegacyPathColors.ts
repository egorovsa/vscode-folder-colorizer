import { PathColorRule } from "../types";

const normalizeTrailingSlashes = (value: string): string =>
  value.replace(/[\\/]+$/, "");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const normalizeExtensionToken = (value: string): string =>
  value.trim().replace(/^\./, "").toLowerCase();

/**
 * Normalizes stored rules. Supports legacy `folderPath` + flags shape in addition
 * to the v3 `{ folderPath | filePath | extension }` shape.
 */
export const migrateLegacyPathColors = (raw: unknown): PathColorRule[] => {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((entry): PathColorRule | null => {
      if (!isRecord(entry)) {
        return null;
      }

      const color = typeof entry.color === "string" ? entry.color : undefined;
      const badge = typeof entry.badge === "string" ? entry.badge : undefined;
      const isFolderOnly = Boolean(entry.isFolderOnly);

      if (typeof entry.extension === "string" && entry.extension.trim()) {
        return {
          extension: normalizeExtensionToken(entry.extension),
          color,
          badge,
        };
      }

      if (typeof entry.filePath === "string" && entry.filePath.trim()) {
        return {
          filePath: normalizeTrailingSlashes(entry.filePath.trim()),
          color,
          badge,
        };
      }

      if (typeof entry.folderPath === "string" && entry.folderPath.trim()) {
        const folderPath = entry.folderPath.trim();
        if (entry.isForExtension) {
          return {
            extension: normalizeExtensionToken(folderPath),
            color,
            badge,
          };
        }
        if (entry.isForFile) {
          return {
            filePath: normalizeTrailingSlashes(folderPath),
            color,
            badge,
          };
        }
        return {
          folderPath,
          isFolderOnly: isFolderOnly || undefined,
          color,
          badge,
        };
      }

      return null;
    })
    .filter((item): item is PathColorRule => Boolean(item));
};
