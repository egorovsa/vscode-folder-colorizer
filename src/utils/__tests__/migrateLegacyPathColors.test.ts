import { migrateLegacyPathColors } from "../migrateLegacyPathColors";

describe("migrateLegacyPathColors", () => {
  it("should migrate extension rules", () => {
    expect(
      migrateLegacyPathColors([
        { folderPath: "TS", color: "c1", isForExtension: true },
      ])
    ).toEqual([{ extension: "ts", color: "c1" }]);
  });

  it("should migrate file rules from isForFile", () => {
    expect(
      migrateLegacyPathColors([
        { folderPath: "a/b/file.ts", color: "c1", isForFile: true },
      ])
    ).toEqual([{ filePath: "a/b/file.ts", color: "c1" }]);
  });

  it("should migrate folder-only rules", () => {
    expect(
      migrateLegacyPathColors([
        { folderPath: "src/", color: "c1", isFolderOnly: true },
      ])
    ).toEqual([{ folderPath: "src/", color: "c1", isFolderOnly: true }]);
  });

  it("should pass through v3 rules", () => {
    expect(
      migrateLegacyPathColors([
        { extension: "cs", color: "c1" },
        { filePath: "x/y", color: "c2" },
        { folderPath: "z/", color: "c3" },
      ])
    ).toEqual([
      { extension: "cs", color: "c1" },
      { filePath: "x/y", color: "c2" },
      { folderPath: "z/", color: "c3" },
    ]);
  });
});
