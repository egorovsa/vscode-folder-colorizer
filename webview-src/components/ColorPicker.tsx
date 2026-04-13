/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { ColorOption } from "../types";
import { inputStyle } from "../UI/styles";

interface ColorPickerProps {
  options: ColorOption[];
  value?: string;
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

export const ColorPicker = ({ options, value, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const normalize = (input?: string): string =>
    (input || "").trim().toLowerCase();
  const normalizedValue = normalize(value);
  const selected = options.find(
    (option) => normalize(option.id) === normalizedValue
  );

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

          {options.map((option) => (
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
                background:
                  normalizedValue === normalize(option.id)
                    ? "rgba(127,127,127,0.2)"
                    : "transparent",
              }}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={swatchStyle(option.hex)} />
                <span style={{ color: option.hex }}>{option.description}</span>
              </span>
              <span>{normalizedValue === normalize(option.id) ? "✓" : ""}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
