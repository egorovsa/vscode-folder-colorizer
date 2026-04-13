import React from "react";

export const pageStyle: React.CSSProperties = {
  fontFamily:
    "var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
  fontSize: "13px",
  padding: "16px",
  color: "var(--vscode-foreground)",
};

export const cardStyle: React.CSSProperties = {
  border: "1px solid var(--vscode-panel-border, rgba(127,127,127,0.35))",
  borderRadius: "10px",
  padding: "12px",
  marginBottom: "12px",
  background: "var(--vscode-editorWidget-background, rgba(127,127,127,0.06))",
};

export const sectionTitleStyle: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: "14px",
  fontWeight: 600,
};

export const sectionDescriptionStyle: React.CSSProperties = {
  margin: "0 0 10px",
  opacity: 0.8,
};

export const actionRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginBottom: "12px",
};

export const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "2fr 2fr 1fr auto auto",
  gap: "8px",
  alignItems: "center",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid var(--vscode-panel-border, rgba(127,127,127,0.25))",
  background: "var(--vscode-sideBar-background)",
  marginBottom: "8px",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid var(--vscode-input-border, rgba(127,127,127,0.35))",
  borderRadius: "6px",
  padding: "7px 9px",
  color: "var(--vscode-input-foreground)",
  background: "var(--vscode-input-background)",
};

export const buttonStyle: React.CSSProperties = {
  border: "1px solid var(--vscode-button-border, transparent)",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  background: "var(--vscode-button-background)",
  color: "var(--vscode-button-foreground)",
};

export const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "var(--vscode-toolbar-hoverBackground, rgba(127,127,127,0.2))",
  color: "var(--vscode-foreground)",
};
