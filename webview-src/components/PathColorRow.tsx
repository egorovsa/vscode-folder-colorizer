/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { ColorOption, PathColorItem } from "../types";
import { ColorPicker } from "./ColorPicker";
import { TextInput } from "../UI/TextInput";
import { Button } from "../UI/Button";
import { rowStyle } from "../UI/styles";

interface PathColorRowProps {
  item: PathColorItem;
  colorOptions: ColorOption[];
  placeholder: string;
  isExtensionRule?: boolean;
  onUpdate: (patch: Partial<PathColorItem>) => void;
  onRemove: () => void;
}

export const PathColorRow = ({
  item,
  colorOptions,
  placeholder,
  isExtensionRule,
  onUpdate,
  onRemove,
}: PathColorRowProps) => {
  return (
    <div style={rowStyle}>
      <TextInput
        placeholder={placeholder}
        value={item.folderPath}
        onChange={(value) => onUpdate({ folderPath: value })}
      />
      <ColorPicker
        options={colorOptions}
        value={item.color}
        onChange={(color) => onUpdate({ color })}
      />
      <TextInput
        maxLength={2}
        placeholder="badge"
        value={item.badge || ""}
        onChange={(value) => onUpdate({ badge: value })}
      />
      {isExtensionRule ? (
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
