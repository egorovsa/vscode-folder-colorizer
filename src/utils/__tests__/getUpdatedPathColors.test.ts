import { PathColorRule } from "../../types";
import { getUpdatedPathColors } from "../getUpdatedPathColors";
import { getConfigPathColors } from "../useConfig";

jest.mock("../useConfig", () => ({
  getConfigPathColors: jest.fn(),
}));

const mockedGetConfigPathColors = getConfigPathColors as jest.MockedFunction<
  typeof getConfigPathColors
>;

describe("getUpdatedPathColors", () => {
  beforeEach(() => {
    mockedGetConfigPathColors.mockReset();
  });

  it("merges badge into existing folder-only rule when patch omits isFolderOnly", () => {
    const existing: PathColorRule[] = [
      {
        folderPath: "live-tree-unity/Assets/Music/",
        isFolderOnly: true,
        color: "foldercolorizer.color_00ff00",
      },
    ];
    mockedGetConfigPathColors.mockReturnValue(existing);

    const result = getUpdatedPathColors({
      ruleType: "folder",
      values: ["live-tree-unity/Assets/Music/"],
      badge: "AA",
    });

    expect(result).toEqual([
      {
        folderPath: "live-tree-unity/Assets/Music/",
        isFolderOnly: true,
        color: "foldercolorizer.color_00ff00",
        badge: "AA",
      },
    ]);
    expect(result).toHaveLength(1);
  });

  it("still distinguishes folder-only vs non-folder-only when patch sets isFolderOnly", () => {
    const existing: PathColorRule[] = [
      {
        folderPath: "src/",
        isFolderOnly: true,
        color: "c1",
      },
      {
        folderPath: "src/",
        color: "c2",
      },
    ];
    mockedGetConfigPathColors.mockReturnValue(existing);

    const result = getUpdatedPathColors({
      ruleType: "folder",
      values: ["src/"],
      badge: "X",
      isFolderOnly: true,
    });

    expect(result[0].badge).toBe("X");
    expect(result[0].isFolderOnly).toBe(true);
    expect(result[1].badge).toBeUndefined();
    expect(result).toHaveLength(2);
  });
});
