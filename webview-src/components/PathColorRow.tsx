/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { ColorOption, PathColorItem } from "../types";
import { ColorPicker } from "./ColorPicker";
import { TextInput } from "../UI/TextInput";
import { Button } from "../UI/Button";
import { rowStyle } from "../UI/styles";

export type PathColorRowVariant = "folder" | "file" | "extension";

interface PathColorRowProps {
  variant: PathColorRowVariant;
  item: PathColorItem;
  colorOptions: ColorOption[];
  favoriteColors: string[];
  placeholder: string;
  onToggleFavoriteColor: (colorId: string) => void;
  onUpdate: (patch: Partial<PathColorItem>) => void;
  onRemove: () => void;
}

export const PathColorRow = ({
  variant,
  item,
  colorOptions,
  favoriteColors,
  placeholder,
  onToggleFavoriteColor,
  onUpdate,
  onRemove,
}: PathColorRowProps) => {
  const pathValue =
    variant === "folder"
      ? item.folderPath || ""
      : variant === "file"
        ? item.filePath || ""
        : item.extension || "";

  const onPathChange = (value: string): void => {
    if (variant === "folder") {
      onUpdate({
        folderPath: value,
        filePath: undefined,
        extension: undefined,
      });
      return;
    }
    if (variant === "file") {
      onUpdate({
        filePath: value,
        folderPath: undefined,
        extension: undefined,
      });
      return;
    }
    onUpdate({
      extension: value.trim().replace(/^\./, "").toLowerCase(),
      folderPath: undefined,
      filePath: undefined,
    });
  };

  const shouldShowFolderOnly = variant === "folder";

  return (
    <div style={rowStyle}>
      <TextInput
        placeholder={placeholder}
        value={pathValue}
        onChange={onPathChange}
      />
      <ColorPicker
        options={colorOptions}
        value={item.color}
        favoriteColors={favoriteColors}
        onToggleFavoriteColor={onToggleFavoriteColor}
        onChange={(color) => onUpdate({ color })}
      />
      <TextInput
        maxLength={2}
        placeholder="badge"
        value={item.badge || ""}
        onChange={(value) => onUpdate({ badge: value })}
      />
      {!shouldShowFolderOnly ? (
        <div />
      ) : (
        <label style={{ whiteSpace: "nowrap" }}>
          <input
            type="checkbox"
            checked={Boolean(item.isFolderOnly)}
            onChange={(event) =>
              onUpdate({ isFolderOnly: event.target.checked })
            }
          />
          folder only
        </label>
      )}
      <Button label="Remove" onClick={onRemove} variant="secondary" />
    </div>
  );
};
