export interface PathColorItem {
  folderPath: string;
  color?: string;
  badge?: string;
  isForExtension?: boolean;
  isForFile?: boolean;
  isFolderOnly?: boolean;
}

export interface ColorOption {
  id: string;
  description: string;
  hex: string;
  group?: string;
}

export interface StatePayload {
  pathColors: PathColorItem[];
  colorOptions: ColorOption[];
  useGlobalSettings: boolean;
  favoriteColors: string[];
}

export type IncomingMessage = {
  type: "state";
  payload: StatePayload;
} | {
  type: "pathPicked";
  payload: {
    folderPath: string;
  };
} | {
  type: "filePicked";
  payload: {
    folderPath: string;
  };
};

export type OutgoingMessage =
  | { type: "getState" }
  | { type: "clearAll" }
  | { type: "savePathColors"; payload: PathColorItem[] }
  | { type: "pickPath" }
  | { type: "pickFile" }
  | { type: "setUseGlobalSettings"; useGlobalSettings: boolean }
  | { type: "setFavoriteColors"; favoriteColors: string[] };
