/** v3 rule: set exactly one of `folderPath`, `filePath`, or `extension`. */
export interface PathColorRule {
  /** Path prefix for folders (and children unless `isFolderOnly`). */
  folderPath?: string;
  /** Exact workspace-relative file path. */
  filePath?: string;
  /** Extension token without leading dot (e.g. `cs`, `ts`). */
  extension?: string;
  color?: string;
  badge?: string;
  isFolderOnly?: boolean;
}

/** @deprecated Use PathColorRule */
export type PathColors = PathColorRule;

export interface PathsColorPatch {
  ruleType: "folder" | "file" | "extension";
  values: string[];
  color?: string;
  badge?: string;
  isFolderOnly?: boolean;
}

/** @deprecated Use PathsColorPatch */
export type PathsColors = PathsColorPatch;

export interface IFind {
  color: string;
  badge: string;
}
