# Change Log

All notable changes to the "folder-color" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

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