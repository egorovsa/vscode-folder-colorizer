# Change Log

All notable changes to the "folder-color" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [2.1.1]
- Fixed `folder-color.setFilesColor` to create exact file path rules instead of extension rules.
- Added a dedicated `setFilesColor` command flow for file rules in Explorer context menu.
- Fixed cross-platform extension parsing for command and matcher logic (including Windows paths).
- Fixed file rule matching to work with and without trailing slash in stored paths.
- Added new utility functions `normalizeFileRulePath` and `getFileExtension` with unit tests.
- Added a dedicated **File rules** section in Control Panel (separate from Path and Extension rules).
- Hidden `folder only` checkbox in Control Panel when editing file rules.
- Added `Pick file` action in Control Panel, analogous to `Pick path`, using native file picker.

## [2.1.0]

- Major update: revamped extension color palette (xterm-256 based), regenerated color contributions, and rebuilt icon set.
- Added color group metadata to contributed colors and grouped display in the Control Panel.
- Replaced static color list JSON with runtime loading of contributed colors from `package.json`.
- Added generation scripts for colors and package contributions under `scripts/generate-colors`.
- Added publish workflow test step (`npm run test`) before packaging.
- Refactored Control Panel webview logic by extracting `usePathRules` and `useFavoriteColorOptions` hooks.

## [2.0.0]

- Added a new Control Panel with Webview UI.
- Added command `folder-color.openControlPanel` and menu entry to open the panel from Explorer context menu.
- Added Path rules and Extension rules sections in the Control Panel.
- Added path picker (`Pick path`) in the Control Panel using native file/folder open dialog.
- Added auto-refresh of Control Panel state when `folder-color.pathColors`, `folder-color.useGlobalSettings`, or `folder-color.favoriteColors` changes.
- Added `folder-color.useGlobalSettings` setting to switch `pathColors` storage target between Workspace and User settings.
- Added `folder-color.favoriteColors` setting and Favorites support in color picker.
- Added dedicated Favorite colors section with:
  - Selected favorites list,
  - All colors list,
  - Name/id filter input,
  - `Reset all` action.
- Added confirmation prompt before `Clear all` action in Control Panel.
- Added instruction section in Control Panel describing rule priority and matching behavior.
- Fixed `folder only` behavior so folder-only color does not apply to child items.
- Added tests for folder-only matching behavior.
- Fixed missing command registration for `folder-color.setFilesColor`.
- Updated Control Panel action label from `Reload` to `Reset`.