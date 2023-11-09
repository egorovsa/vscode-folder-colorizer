import { workspace } from "vscode";
import { userPathLessPath } from "../userPathLessPath";

jest.mock("vscode");

describe("userPathLessPath", () => {
  it("should replace path prefix properly for nix paths", () => {
    const a = userPathLessPath("/Users/test/Work/ProjectName/some/folder");
    expect(a).toBe("ProjectName/some/folder/");
  });

  it("should replace path prefix properly for windows paths", () => {
    const a = userPathLessPath("C:\\User\\Work\\ProjectName\\some\\folder");
    expect(a).toBe("ProjectName\\some\\folder\\");
  });
});
