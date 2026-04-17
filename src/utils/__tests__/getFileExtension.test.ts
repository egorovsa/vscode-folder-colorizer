import { getFileExtension } from "../getFileExtension";

describe("getFileExtension", () => {
  it("should return extension for unix file path", () => {
    expect(getFileExtension("folder/file.ts")).toBe("ts");
  });

  it("should return extension for windows file path", () => {
    expect(getFileExtension("folder\\file.cs")).toBe("cs");
  });

  it("should return extension with trailing slash", () => {
    expect(getFileExtension("folder/file.json/")).toBe("json");
  });

  it("should return empty string for file without extension", () => {
    expect(getFileExtension("folder/file")).toBe("");
  });

  it("should return empty string for dotfile", () => {
    expect(getFileExtension(".gitignore")).toBe("");
  });
});
