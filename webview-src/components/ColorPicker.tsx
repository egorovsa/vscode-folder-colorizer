/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { ColorOption } from "../types";
import { inputStyle } from "../UI/styles";

interface ColorPickerProps {
  options: ColorOption[];
  value?: string;
  favoriteColors: string[];
  onToggleFavoriteColor: (colorId: string) => void;
  onChange: (value?: string) => void;
}

const swatchStyle = (hex: string): React.CSSProperties => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.3)",
  background: hex,
  flexShrink: 0,
});

export const ColorPicker = ({
  options,
  value,
  favoriteColors,
  onToggleFavoriteColor,
  onChange,
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const normalize = (input?: string): string =>
    (input || "").trim().toLowerCase();
  const normalizedValue = normalize(value);
  const favoriteSet = new Set(favoriteColors.map((item) => normalize(item)));
  const selected = options.find(
    (option) => normalize(option.id) === normalizedValue
  );
  const favoriteOptions = options.filter((option) =>
    favoriteSet.has(normalize(option.id))
  );
  const otherOptions = options.filter(
    (option) => !favoriteSet.has(normalize(option.id))
  );

  const renderColorOption = (option: ColorOption) => {
    const isSelected = normalizedValue === normalize(option.id);
    const isFavorite = favoriteSet.has(normalize(option.id));

    return (
      <button
        key={option.id}
        type="button"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px",
          border: "none",
          background: isSelected ? "rgba(127,127,127,0.2)" : "transparent",
        }}
        onClick={() => {
          onChange(option.id);
          setIsOpen(false);
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={swatchStyle(option.hex)} />
          <span style={{ color: option.hex }}>{option.description}</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavoriteColor(option.id);
            }}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--vscode-foreground)",
            }}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
          <span>{isSelected ? "✓" : ""}</span>
        </span>
      </button>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        style={{
          ...inputStyle,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {selected ? (
            <span style={swatchStyle(selected.hex)} />
          ) : (
            <span style={swatchStyle("transparent")} />
          )}
          {selected ? selected.description : value || "No color"}
        </span>
        <span>▾</span>
      </button>

      {isOpen ? (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            marginTop: "4px",
            width: "100%",
            maxHeight: "240px",
            overflowY: "auto",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "6px",
            background: "var(--vscode-editor-background)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          }}
        >
          <button
            type="button"
            style={{
              width: "100%",
              textAlign: "left",
              padding: "8px",
              border: "none",
              background: "transparent",
            }}
            onClick={() => {
              onChange(undefined);
              setIsOpen(false);
            }}
          >
            No color {normalizedValue ? "" : "✓"}
          </button>

          {favoriteOptions.length > 0 ? (
            <>
              <div style={{ padding: "6px 8px", opacity: 0.7, fontSize: "12px" }}>
                Favorites
              </div>
              {favoriteOptions.map(renderColorOption)}
              <div
                style={{
                  margin: "4px 0",
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                }}
              />
            </>
          ) : null}

          {otherOptions.length > 0 ? (
            <div style={{ padding: "6px 8px", opacity: 0.7, fontSize: "12px" }}>
              All colors
            </div>
          ) : null}
          {otherOptions.map(renderColorOption)}
        </div>
      ) : null}
    </div>
  );
};
