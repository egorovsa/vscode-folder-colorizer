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

const iconsDir = path.join(rootDir, "resources", "icons");

const paletteRaw = await fs.readFile(palettePath, "utf8");
const palette = JSON.parse(paletteRaw);

const uniqueHexColors = new Set();

for (const group of palette) {
  for (const entry of group.colors ?? []) {
    if (typeof entry.color !== "string") {
      continue;
    }

    const normalized = entry.color.trim().toLowerCase();
    if (!/^#[0-9a-f]{6}$/.test(normalized)) {
      continue;
    }

    uniqueHexColors.add(normalized.slice(1));
  }
}

await fs.rm(iconsDir, { recursive: true, force: true });
await fs.mkdir(iconsDir, { recursive: true });

let writtenFiles = 0;

for (const hex of uniqueHexColors) {
  const fileName = `color_${hex}.svg`;
  const filePath = path.join(iconsDir, fileName);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="8" fill="#${hex}"/></svg>`;

  await fs.writeFile(filePath, svg, "utf8");
  writtenFiles += 1;
}

console.log(`Generated ${writtenFiles} icon files from ${palettePath}.`);
