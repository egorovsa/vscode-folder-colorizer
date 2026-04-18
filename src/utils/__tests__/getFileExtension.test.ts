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

  it("should return conventional extension token for dotfiles", () => {
    expect(getFileExtension(".gitignore")).toBe("gitignore");
  });

  it("should return htaccess for .htaccess", () => {
    expect(getFileExtension(".htaccess")).toBe("htaccess");
  });

  it("should return nested dotfile token from full path", () => {
    expect(getFileExtension("live-tree-unity/.vscode/.htaccess")).toBe(
      "htaccess"
    );
  });

  it("should return last segment after dot for multi-part dotfile names", () => {
    expect(getFileExtension(".env.local")).toBe("local");
  });

  it("should return empty string for single-dot filename", () => {
    expect(getFileExtension(".")).toBe("");
  });
});
