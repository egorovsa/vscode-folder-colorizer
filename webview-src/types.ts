export interface PathColorItem {
  folderPath: string;
  color?: string;
  badge?: string;
  isForExtension?: boolean;
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
};

export type OutgoingMessage =
  | { type: "getState" }
  | { type: "clearAll" }
  | { type: "savePathColors"; payload: PathColorItem[] }
  | { type: "pickPath" }
  | { type: "setUseGlobalSettings"; useGlobalSettings: boolean }
  | { type: "setFavoriteColors"; favoriteColors: string[] };
