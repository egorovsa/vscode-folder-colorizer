import { isLikelyFilePathRule } from "../pathRuleKind";

describe("isLikelyFilePathRule", () => {
  it("should treat .htaccess as a file rule", () => {
    expect(
      isLikelyFilePathRule("live-tree-unity/.vscode/.htaccess")
    ).toBe(true);
  });

  it("should treat .vscode as a folder rule", () => {
    expect(isLikelyFilePathRule("live-tree-unity/.vscode")).toBe(false);
  });

  it("should treat a plain folder segment as a folder rule", () => {
    expect(isLikelyFilePathRule("live-tree-unity/Assets")).toBe(false);
  });

  it("should treat conventional files as file rules", () => {
    expect(isLikelyFilePathRule("src/utils/foo.ts")).toBe(true);
  });

  it("should treat .gitignore as a file rule", () => {
    expect(isLikelyFilePathRule("folder/.gitignore")).toBe(true);
  });
});
