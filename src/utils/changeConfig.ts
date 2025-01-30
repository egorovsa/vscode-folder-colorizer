import { PathsColors } from "../types";
import { colorize } from "./colorize";
import { getUpdatedPathColors } from "./getUpdatedPathColors";
import { updateConfigPathColors } from "./useConfig";

export const changeConfig = (
  pathColor: Partial<PathsColors>,
  toRemove = false
) => {
  const pathColors = getUpdatedPathColors(pathColor, toRemove);
  updateConfigPathColors(pathColors);
  colorize();
};
