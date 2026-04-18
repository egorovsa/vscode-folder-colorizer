import { checkPathColorOrBadge } from "../checkPathColorOrBadge";
import { PathColorRule } from "../../types";

jest.mock("vscode");

describe("checkPathColorOrBadge", () => {
  it("should return the correct color and badge for a given path", () => {
    const pathColors: PathColorRule[] = [
      {
        folderPath: "/path/that/have/folder/",
        color: "red",
        badge: "W",
      },
      {
        folderPath: "/path/that/have/file.ts/",
        color: "blue",
        badge: "FC",
      },
    ];

    expect(
      checkPathColorOrBadge("/path/that/have/file.ts/", pathColors)
    ).toEqual({ color: "blue", badge: "FC" });

    expect(
      checkPathColorOrBadge("/path/that/have/folder/this", pathColors)
    ).toEqual({
      color: "red",
      badge: "W",
    });

    expect(
      checkPathColorOrBadge("/path/that/have/folder/andFile.tsx", pathColors)
    ).toEqual({
      color: "red",
      badge: "W",
    });
  });

  it("should return an empty color and badge if no matching path is found", () => {
    const pathColors: PathColorRule[] = [
      {
        folderPath: "/path/that/have/folder1/",
        color: "red",
        badge: "W",
      },
    ];
    const result = checkPathColorOrBadge(
      "/path/that/have/folder2/",
      pathColors
    );
    expect(result).toEqual({ color: "", badge: "" });
  });

  it("should return the longest matching path's color and badge", () => {
    const pathColors: PathColorRule[] = [
      {
        folderPath: "/this/is/thePath",
        color: "green",
        badge: "U",
      },
      {
        folderPath: "/this/is/thePath/Work",
        color: "red",
        badge: "W",
      },
      {
        folderPath: "/this/is/thePath/Work/folder-colorizer",
        color: "blue",
        badge: "FC",
      },
    ];

    expect(
      checkPathColorOrBadge(
        "/this/is/thePath/Work/folder-colorizer/src/utils",
        pathColors
      )
    ).toEqual({ color: "blue", badge: "FC" });
  });

  it("should ignore extension rules for path prefix matching", () => {
    const pathColors: PathColorRule[] = [
      {
        extension: "ts",
        color: "red",
        badge: "H",
      },
      {
        folderPath: "live-tree-unity/.vscode/",
        color: "blue",
        badge: "V",
      },
    ];

    expect(
      checkPathColorOrBadge("live-tree-unity/.vscode/htaccess", pathColors)
    ).toEqual({ color: "blue", badge: "V" });
  });

  it("should ignore filePath rules for path prefix matching", () => {
    const pathColors: PathColorRule[] = [
      {
        filePath: "live-tree-unity/.vscode/htaccess",
        color: "red",
        badge: "H",
      },
      {
        folderPath: "live-tree-unity/.vscode/",
        color: "blue",
        badge: "V",
      },
    ];

    expect(
      checkPathColorOrBadge("live-tree-unity/.vscode/htaccess", pathColors)
    ).toEqual({ color: "blue", badge: "V" });
  });

  it("should return an empty color if the best fit is for extension-only rows", () => {
    const pathColors: PathColorRule[] = [
      {
        extension: "tsx",
        color: "red",
        badge: "W",
      },
    ];
    const result = checkPathColorOrBadge(
      "/this/is/thePath/Work/folder-colorizer",
      pathColors
    );
    expect(result).toEqual({ color: "", badge: "" });
  });
});
