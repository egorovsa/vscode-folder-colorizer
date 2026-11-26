import * as vscode from "vscode";
import { patchConfig, userPathBasePathLess } from "../utils";
import emoji from "../lists/emoji.json";

export const setEmojiBadgeCommand = () => {
  return (_: vscode.Uri, context2: vscode.Uri[]) => {
    vscode.window
      .showQuickPick(
        // QuickPick matches only the label by default, and the label is the emoji itself:
        // the name, aliases and tags go in the description, which is matched too.
        emoji.map((entry) => {
          const keywords = [
            ...new Set(
              [...entry.aliases, ...entry.tags].map((word) => word.replace(/_/g, " "))
            ),
          ].filter((word) => !entry.description.includes(word));

          return {
            label: entry.emoji,
            description: keywords.length
              ? `${entry.description} · ${keywords.join(", ")}`
              : entry.description,
          };
        }),
        {
          placeHolder: "Choose emoji badge: ",
          matchOnDescription: true,
        }
      )
      .then((selected) => {
        if (!selected) {
          return;
        }

        patchConfig({
          ruleType: "folder",
          values: context2.map((item) => userPathBasePathLess(item.fsPath)),
          badge: selected.label,
        });
      });
  };
};
