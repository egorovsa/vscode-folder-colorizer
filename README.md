# Folder color

Folder color is an extension for Visual Studio Code that enables you to easily and quickly set colors and badges on any folder or file in your file manager for better organization and navigation of your projects.

## Breaking changes (3.0.0)

The `folder-color.pathColors` setting uses a **new rule shape**. Each rule must set **exactly one** of:

- **`folderPath`** — folder / path-prefix rule (optional `isFolderOnly` for “this folder only”).
- **`filePath`** — exact workspace-relative file path.
- **`extension`** — extension token **without** a leading dot (for example `"cs"`, `"ts"`).

Legacy fields **`isForExtension`** and **`isForFile`** are no longer stored. Extension rules used to look like `{ "folderPath": "ts", "isForExtension": true }`; they are now `{ "extension": "ts" }`. Exact file rules use `{ "filePath": "path/to/File.cs" }` instead of a file path packed into `folderPath` with flags.

**Runtime:** On load, the extension still understands **old** JSON and normalizes it in memory (`migrateLegacyPathColors`). **On save** (Control Panel **Save**, context-menu color/badge actions, and so on), settings are written back in the **new** format only.

**If you never hand-edited `pathColors` in JSON:** open the **Folder Color – Control Panel**, then click **Save** (you do not need to change anything). That rewrites `folder-color.pathColors` in the new shape automatically.

**If you edit `settings.json` by hand:** update rules to use `folderPath` / `filePath` / `extension` as above. See `CHANGELOG.md` for the full 3.0.0 notes.

![vscode-folder-colorizer](https://github.com/egorovsa/vscode-folder-colorizer/blob/main/fc-cp.png?raw=true)
![vscode-folder-colorizer](https://github.com/egorovsa/vscode-folder-colorizer/blob/main/GIF.gif?raw=true)

![vscode-folder-colorizer](https://github.com/egorovsa/vscode-folder-colorizer/blob/main/preview.png?raw=true)

![vscode-folder-colorizer](https://github.com/egorovsa/vscode-folder-colorizer/blob/main/preview-menu.png?raw=true)

## Features

folder-color provides the following features:

1. **Color Setting:** Assign colors to your files or folders with simple actions, allowing you to work more efficiently and highlight important content.
2. **Badge Addition:** Add various types of badges to your folders or files to make them visually distinctive.
3. **Emoji Selection:** Choose from a list of emojis to use as a festive and expressive badge for any folder or file, further personalizing your project's structure.

To access these features, right-click on the desired folder or file in your file manager, select the "Colorize" option from the context menu, and then pick a color or badge. With the added emoji feature, you can bring even more character to your directory, making it fun and easier to navigate.

**Enjoy using folder-color with its enhanced capabilities for colorizing and customizing your project**.
