export interface PathColors {
  folderPath: string;
  color?: string;
  badge?: string;
  isForExtension?: boolean;
  isFolderOnly?: boolean;
}

export interface PathsColors extends Omit<PathColors, "folderPath"> {
  folderPath: string[];
}

export interface IFind {
  color: string;
  badge: string;
}
