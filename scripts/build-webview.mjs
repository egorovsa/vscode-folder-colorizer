import { build } from "esbuild";

await build({
  entryPoints: ["webview-src/index.tsx"],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  outfile: "out/webview/index.js",
  jsx: "automatic",
  loader: {
    ".tsx": "tsx",
    ".ts": "ts",
  },
});
