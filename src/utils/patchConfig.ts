import { PathsColorPatch } from "../types";
import { colorize } from "./colorize";
import { getUpdatedPathColors } from "./getUpdatedPathColors";
import { updateConfigPathColors } from "./useConfig";

export const patchConfig = (patch: PathsColorPatch, toRemove = false) => {
  const pathColors = getUpdatedPathColors(patch, toRemove);
  updateConfigPathColors(pathColors);
  colorize();
};
