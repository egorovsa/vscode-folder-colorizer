import { workspace } from "vscode";
import { checkPathColorOrBadge } from "../checkPathColorOrBadge";
import { PathColors } from "../../types";

jest.mock("vscode");

describe("checkPathColorOrBadge", () => {
  it("should return the correct color and badge for a given path", () => {
    const pathColors: PathColors[] = [
      {
        folderPath: "/path/that/have/folder/",
        color: "red",
        badge: "W",
        isForExtension: false,
      },
      {
        folderPath: "/path/that/have/file.ts/",
        color: "blue",
        badge: "FC",
        isForExtension: false,
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
    const pathColors: PathColors[] = [
      {
        folderPath: "/path/that/have/folder1/",
        color: "red",
        badge: "W",
        isForExtension: false,
      },
    ];
    const result = checkPathColorOrBadge(
      "/path/that/have/folder2/",
      pathColors
    );
    expect(result).toEqual({ color: "", badge: "" });
  });

  it("should return the longest matching path's color and badge", () => {
    const pathColors: PathColors[] = [
      {
        folderPath: "/this/is/thePath",
        color: "green",
        badge: "U",
        isForExtension: false,
      },
      {
        folderPath: "/this/is/thePath/Work",
        color: "red",
        badge: "W",
        isForExtension: false,
      },
      {
        folderPath: "/this/is/thePath/Work/folder-colorizer",
        color: "blue",
        badge: "FC",
        isForExtension: false,
      },
    ];

    expect(
      checkPathColorOrBadge(
        "/this/is/thePath/Work/folder-colorizer/src/utils",
        pathColors
      )
    ).toEqual({ color: "blue", badge: "FC" });
  });

  it("should return an empty color if the best fit is for extension", () => {
    const pathColors: PathColors[] = [
      {
        folderPath: "/this/is/thePath/Work",
        color: "red",
        badge: "W",
        isForExtension: true,
      },
    ];
    const result = checkPathColorOrBadge(
      "/this/is/thePath/Work/folder-colorizer",
      pathColors
    );
    expect(result).toEqual({ color: "", badge: "W" });
  });
});
