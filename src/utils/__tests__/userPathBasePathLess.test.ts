import { workspace } from "vscode";
import { userPathBasePathLess } from "../userPathLessPath";

jest.mock("vscode");

describe("userPathLessPath", () => {
  it("should replace path prefix properly for nix paths", () => {
    const a = userPathBasePathLess("/Users/test/Work/ProjectName/some/folder");
    expect(a).toBe("ProjectName/some/folder/");
  });

  it("should replace path prefix properly for windows paths", () => {
    const a = userPathBasePathLess("C:\\User\\Work\\ProjectName\\some\\folder");
    expect(a).toBe("ProjectName\\some\\folder\\");
  });
});
