/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { Button } from "../UI/Button";
import { actionRowStyle } from "../UI/styles";

interface ControlActionsProps {
  onSave: () => void;
  onReload: () => void;
  onClearAll: () => void;
  useGlobalSettings: boolean;
  onToggleUseGlobalSettings: (value: boolean) => void;
}

export const ControlActions = ({
  onSave,
  onReload,
  onClearAll,
  useGlobalSettings,
  onToggleUseGlobalSettings,
}: ControlActionsProps) => {
  return (
    <>
      <div style={actionRowStyle}>
        <Button label="Save" onClick={onSave} />
        <Button label="Reload" onClick={onReload} variant="secondary" />
        <Button label="Clear all" onClick={onClearAll} variant="secondary" />
      </div>
      <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <input
          type="checkbox"
          checked={useGlobalSettings}
          onChange={(event) => onToggleUseGlobalSettings(event.target.checked)}
        />
        Use global settings (User) for path colors
      </label>
    </>
  );
};
