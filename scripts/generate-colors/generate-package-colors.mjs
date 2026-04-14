import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, "../../");

const palettePath = path.join(
  rootDir,
  "scripts",
  "generate-colors",
  "palette.json"
);
const packageJsonPath = path.join(rootDir, "package.json");

const paletteRaw = await fs.readFile(palettePath, "utf8");
const palette = JSON.parse(paletteRaw);

const toTitleCase = (value) =>
  value
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const colors = [];

for (const group of palette) {
  const groupName = typeof group.group === "string" ? group.group : "Ungrouped";
  const groupColors = Array.isArray(group.colors) ? group.colors : [];

  for (const entry of groupColors) {
    if (typeof entry?.color !== "string" || typeof entry?.name !== "string") {
      continue;
    }

    const normalized = entry.color.trim().toLowerCase();
    if (!/^#[0-9a-f]{6}$/.test(normalized)) {
      continue;
    }

    const hex = normalized.slice(1);
    colors.push({
      id: `foldercolorizer.color_${hex}`,
      defaults: {
        dark: normalized,
        light: normalized,
        highContrast: normalized,
        highContrastLight: normalized
      },
      description: toTitleCase(entry.name),
      group: groupName
    });
  }
}

const packageJsonRaw = await fs.readFile(packageJsonPath, "utf8");
const packageJson = JSON.parse(packageJsonRaw);

if (!packageJson.contributes || typeof packageJson.contributes !== "object") {
  throw new Error("package.json does not contain a valid contributes object.");
}

packageJson.contributes.colors = colors;

await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");

console.log(`Generated ${colors.length} package colors from ${palettePath}.`);
