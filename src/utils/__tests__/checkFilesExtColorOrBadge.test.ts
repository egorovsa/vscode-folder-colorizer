import { checkFilesExtColorOrBadge } from "../checkFilesExtColorOrBadge";
import { PathColorRule } from "../../types";

jest.mock("vscode");

describe("checkFilesExtColorOrBadge", () => {
  it("should return the correct badge and color for a file extension", () => {
    const pathColors: PathColorRule[] = [
      {
        extension: "js",
        badge: "JS",
        color: "yellow",
      },
      {
        extension: "ts",
        badge: "TS",
        color: "blue",
      },
    ];
    const result = checkFilesExtColorOrBadge("file.ts", pathColors);
    expect(result).toEqual({ badge: "TS", color: "blue" });
  });

  it("should return the correct badge and color for Windows file path", () => {
    const pathColors: PathColorRule[] = [
      {
        extension: "ts",
        badge: "TS",
        color: "blue",
      },
    ];

    const result = checkFilesExtColorOrBadge(
      "folder-colorizer\\src\\file.ts\\",
      pathColors
    );
    expect(result).toEqual({ badge: "TS", color: "blue" });
  });

  it("should return empty badge and color if no matching extension is found", () => {
    const pathColors: PathColorRule[] = [
      {
        extension: "jsx",
        badge: "JSX",
        color: "yellow",
      },
    ];
    expect(checkFilesExtColorOrBadge("file.ts", pathColors)).toEqual({
      badge: "",
      color: "",
    });

    expect(checkFilesExtColorOrBadge("file.js", pathColors)).toEqual({
      badge: "",
      color: "",
    });
  });

  it("should return empty badge and color for a folder path", () => {
    const pathColors: PathColorRule[] = [
      {
        extension: "js",
        badge: "JS",
        color: "yellow",
      },
    ];
    const result = checkFilesExtColorOrBadge("folder/", pathColors);
    expect(result).toEqual({ badge: "", color: "" });
  });

  it("should match dotfiles using conventional extension token", () => {
    const pathColors: PathColorRule[] = [
      {
        extension: "gitignore",
        badge: "GI",
        color: "yellow",
      },
    ];

    const result = checkFilesExtColorOrBadge(".gitignore", pathColors);
    expect(result).toEqual({ badge: "GI", color: "yellow" });
  });

  it("should match .htaccess with extension rule htaccess", () => {
    const pathColors: PathColorRule[] = [
      {
        extension: "htaccess",
        badge: "HA",
        color: "yellow",
      },
    ];

    const result = checkFilesExtColorOrBadge(
      "live-tree-unity/.vscode/.htaccess",
      pathColors
    );
    expect(result).toEqual({ badge: "HA", color: "yellow" });
  });
});
