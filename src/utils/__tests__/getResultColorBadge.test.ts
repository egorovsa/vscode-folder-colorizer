import { getResultColorBadge } from "../getResultColorBadge";
import { PathColorRule } from "../../types";

jest.mock("vscode");

const config: PathColorRule[] = [
  {
    filePath: "BB/src/core/sagas/bbbe/measurement-unit-core-saga.ts/",
    color: "TSFILECOLOR",
  },
  {
    extension: "tsx",
    color: "foldercolorizer.color_66ccff",
  },
  {
    folderPath: "BB/src/core/sagas/bbbe/",
    badge: "AA",
    color: "foldercolorizer.color_33cc33",
  },
  {
    extension: "json",
    color: "JSONCOLOR",
  },
  {
    folderPath: "BB/src/core/sagas/bbbe/",
    color: "FOLDER_ONLY_COLOR",
    isFolderOnly: true,
  },
];

describe("getResultColorBadge", () => {
  it("should return color from one path and badge from another", () => {
    expect(
      getResultColorBadge(
        "BB/src/core/sagas/bbbe/measurement-unit-core-saga.ts/",
        config
      )
    ).toEqual({
      color: "TSFILECOLOR",
      badge: "AA",
    });
  });
  it("should return color for json file", () => {
    expect(
      getResultColorBadge("BB/src/core/sagas/bbbe/fileconfig.json/", config)
    ).toEqual({
      color: "JSONCOLOR",
      badge: "AA",
    });
  });

  it("should apply filePath exact rule when entry is a file", () => {
    const pathColors: PathColorRule[] = [
      {
        filePath: "live-tree-unity/.vscode/htaccess",
        color: "FILECOLOR",
      },
    ];
    expect(
      getResultColorBadge("live-tree-unity/.vscode/htaccess", pathColors, {
        entryIsFile: true,
      })
    ).toEqual({
      color: "FILECOLOR",
      badge: "",
    });
  });

  it("should keep folder-only color only on exact folder path", () => {
    expect(getResultColorBadge("BB/src/core/sagas/bbbe/", config)).toEqual({
      color: "FOLDER_ONLY_COLOR",
      badge: "AA",
    });
  });

  it("should not apply folder-only color to child path", () => {
    expect(
      getResultColorBadge("BB/src/core/sagas/bbbe/child-folder/", config)
    ).toEqual({
      color: "foldercolorizer.color_33cc33",
      badge: "AA",
    });
  });
});
