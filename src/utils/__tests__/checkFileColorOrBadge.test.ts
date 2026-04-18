import { checkFileColorOrBadge } from "../checkFileColorOrBadge";
import { PathColorRule } from "../../types";

jest.mock("vscode");

describe("checkFileColorOrBadge", () => {
  it("should return empty badge and color for non-file paths when stat is unknown", () => {
    const result = checkFileColorOrBadge("folder", []);
    expect(result).toEqual({ badge: "", color: "" });
  });

  it("should return empty badge and color if pathColors is empty", () => {
    const result = checkFileColorOrBadge("file.txt", []);
    expect(result).toEqual({ badge: "", color: "" });
  });

  it("should return correct badge and color if filePath is found", () => {
    const path = "/this/is/folder/file.txt/";
    const pathColors: PathColorRule[] = [
      {
        filePath: "/this/is/folder/file.txt",
        badge: "badge1",
        color: "color1",
      },
    ];
    const result = checkFileColorOrBadge(path, pathColors);
    expect(result).toEqual({ badge: "badge1", color: "color1" });
  });

  it("should match the same file with and without trailing slash", () => {
    const path = "folder/file.ts";
    const pathColors: PathColorRule[] = [
      {
        filePath: "folder/file.ts/",
        badge: "TS",
        color: "blue",
      },
    ];

    const result = checkFileColorOrBadge(path, pathColors);
    expect(result).toEqual({ badge: "TS", color: "blue" });
  });

  it("should match dotfile filePath rules", () => {
    const path = "live-tree-unity/.vscode/.htaccess";
    const pathColors: PathColorRule[] = [
      {
        filePath: "live-tree-unity/.vscode/.htaccess",
        badge: "HA",
        color: "red",
      },
    ];
    const result = checkFileColorOrBadge(path, pathColors);
    expect(result).toEqual({ badge: "HA", color: "red" });
  });

  it("should not match general path rules on folder-like paths", () => {
    const path = "BB/src/core/sagas/bbbe/";
    const pathColors: PathColorRule[] = [
      {
        folderPath: "BB/src/core/sagas/bbbe/",
        badge: "AA",
        color: "foldercolorizer.color_33cc33",
      },
    ];
    const result = checkFileColorOrBadge(path, pathColors);
    expect(result).toEqual({ badge: "", color: "" });
  });

  it("should match extensionless filePath when entry is a file", () => {
    const path = "live-tree-unity/.vscode/htaccess";
    const pathColors: PathColorRule[] = [
      {
        filePath: "live-tree-unity/.vscode/htaccess",
        badge: "H",
        color: "red",
      },
    ];
    const result = checkFileColorOrBadge(path, pathColors, {
      entryIsFile: true,
    });
    expect(result).toEqual({ badge: "H", color: "red" });
  });

  it("should not match filePath rule when entry is a directory", () => {
    const path = "live-tree-unity/.vscode/htaccess";
    const pathColors: PathColorRule[] = [
      {
        filePath: "live-tree-unity/.vscode/htaccess",
        badge: "H",
        color: "red",
      },
    ];
    const result = checkFileColorOrBadge(path, pathColors, {
      entryIsFile: false,
    });
    expect(result).toEqual({ badge: "", color: "" });
  });

  it("should not match folder-only rules", () => {
    const path = "folder/file.ts";
    const pathColors: PathColorRule[] = [
      {
        folderPath: "folder/file.ts",
        badge: "X",
        color: "blue",
        isFolderOnly: true,
      },
    ];
    const result = checkFileColorOrBadge(path, pathColors);
    expect(result).toEqual({ badge: "", color: "" });
  });

  it("should return empty badge and color if path is not found in pathColors", () => {
    const path = "this/is/folder/file.txt/";
    const pathColors: PathColorRule[] = [
      {
        filePath: "this/is/folder/file.tx/",
        badge: "badge1",
        color: "color1",
      },
    ];
    const result = checkFileColorOrBadge(path, pathColors);
    expect(result).toEqual({ badge: "", color: "" });
  });
});
