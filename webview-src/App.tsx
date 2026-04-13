/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { ControlActions } from "./components/ControlActions";
import { PathColorRow } from "./components/PathColorRow";
import { IncomingMessage, ColorOption, PathColorItem } from "./types";
import { postToExtension } from "./vscodeApi";
import { Section } from "./UI/Section";
import { Button } from "./UI/Button";
import { pageStyle } from "./UI/styles";

export const App = () => {
  const [pathColors, setPathColors] = React.useState([] as PathColorItem[]);
  const [colorOptions, setColorOptions] = React.useState([] as ColorOption[]);
  const [useGlobalSettings, setUseGlobalSettings] = React.useState(false);

  const indexedRules = pathColors.map((item, index) => ({ item, index }));
  const folderRules = indexedRules.filter((rule) => !rule.item.isForExtension);
  
  const extensionRules = indexedRules.filter(
    (rule) => rule.item.isForExtension
  );

  const updateRow = (index: number, patch: Partial<PathColorItem>): void => {
    setPathColors((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === index
          ? {
              ...row,
              ...patch,
            }
          : row
      )
    );
  };

  const removeRow = (index: number): void => {
    setPathColors((prev) => prev.filter((_, rowIndex) => rowIndex !== index));
  };

  const addPathRule = (): void => {
    setPathColors((prev) => [...prev, { folderPath: "" }]);
  };

  const addExtensionRule = (): void => {
    setPathColors((prev) => [
      ...prev,
      { folderPath: "", isForExtension: true },
    ]);
  };

  const save = (): void => {
    const sanitized = pathColors
      .map((item) => ({
        ...item,
        folderPath: item.isForExtension
          ? item.folderPath.trim().replace(/^\./, "").toLowerCase()
          : item.folderPath.trim(),
        badge: item.badge?.trim() || undefined,
      }))
      .filter((item) => item.folderPath.length > 0);

    postToExtension({
      type: "savePathColors",
      payload: sanitized,
    });
  };

  const listener = (event: MessageEvent<IncomingMessage>) => {
    const message = event.data;

    if (message?.type === "state") {
      setPathColors(message.payload.pathColors || []);
      setColorOptions(message.payload.colorOptions || []);
      setUseGlobalSettings(Boolean(message.payload.useGlobalSettings));
      return;
    }

    if (message?.type === "pathPicked") {
      setPathColors((prev) => [
        ...prev,
        { folderPath: message.payload.folderPath },
      ]);
    }
  };

  React.useEffect(() => {
    window.addEventListener("message", listener);
    postToExtension({ type: "getState" });

    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  return (
    <div style={pageStyle}>
      <h2 style={{ margin: "0 0 6px" }}>Folder Color - Control Panel</h2>

      <p style={{ margin: "0 0 12px", opacity: 0.85 }}>
        Edit and save folder color rules.
      </p>

      <ControlActions
        onSave={save}
        onReload={() => postToExtension({ type: "getState" })}
        onClearAll={() => postToExtension({ type: "clearAll" })}
        useGlobalSettings={useGlobalSettings}
        onToggleUseGlobalSettings={(value) => {
          setUseGlobalSettings(value);
          postToExtension({
            type: "setUseGlobalSettings",
            useGlobalSettings: value,
          });
        }}
      />

      <Section
        title="Path rules"
        description="Apply color and badge for specific folder paths."
      >
        <div style={{ marginBottom: "8px" }}>
          <Button
            label="Add path rule"
            onClick={addPathRule}
            variant="secondary"
          />
          <span style={{ marginLeft: "8px" }}>
            <Button
              label="Pick path"
              onClick={() => postToExtension({ type: "pickPath" })}
              variant="secondary"
            />
          </span>
        </div>
        {folderRules.map(({ item, index }) => (
          <div key={`path-${index}`}>
            <PathColorRow
              item={item}
              colorOptions={colorOptions}
              placeholder="folder path"
              onUpdate={(patch) => updateRow(index, patch)}
              onRemove={() => removeRow(index)}
            />
          </div>
        ))}
      </Section>

      <Section
        title="Extension rules"
        description="Add file extension only (for example: ts, json, md)."
      >
        <div style={{ marginBottom: "8px" }}>
          <Button
            label="Add extension rule"
            onClick={addExtensionRule}
            variant="secondary"
          />
        </div>
        {extensionRules.map(({ item, index }) => (
          <div key={`ext-${index}`}>
            <PathColorRow
              item={item}
              colorOptions={colorOptions}
              placeholder="file extension"
              isExtensionRule={true}
              onUpdate={(patch) =>
                updateRow(index, {
                  ...patch,
                  isForExtension: true,
                  isFolderOnly: false,
                })
              }
              onRemove={() => removeRow(index)}
            />
          </div>
        ))}
      </Section>

      <Section
        title="How rule matching works"
        description="The extension picks color and badge using a fixed priority order."
      >
        <ol style={{ margin: "0", paddingLeft: "18px", lineHeight: 1.5 }}>
          <li>
            <strong>Exact file path rule</strong> has top priority.
          </li>
          <li>
            <strong>Extension rule</strong> applies to files by extension (for
            example
            <code> ts </code>
            or
            <code> json </code>).
          </li>
          <li>
            <strong>Folder only rule</strong> applies only to that exact folder
            and does not affect children.
          </li>
          <li>
            <strong>Path rule</strong> applies to matching paths and children.
          </li>
        </ol>
        <p style={{ marginTop: "10px", marginBottom: 0, opacity: 0.85 }}>
          Notes: extension values are normalized (for example <code>.TS</code>{" "}
          becomes
          <code> ts</code>) on save.
        </p>
      </Section>
    </div>
  );
};
