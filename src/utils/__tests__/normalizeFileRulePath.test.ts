import { normalizeFileRulePath } from "../normalizeFileRulePath";

describe("normalizeFileRulePath", () => {
  it("should keep path without trailing slash", () => {
    expect(normalizeFileRulePath("folder/file.ts")).toBe("folder/file.ts");
  });

  it("should remove trailing unix slash", () => {
    expect(normalizeFileRulePath("folder/file.ts/")).toBe("folder/file.ts");
  });

  it("should remove trailing windows slash", () => {
    expect(normalizeFileRulePath("folder\\file.ts\\")).toBe("folder\\file.ts");
  });

  it("should remove multiple trailing slashes", () => {
    expect(normalizeFileRulePath("folder/file.ts///")).toBe("folder/file.ts");
  });
});
