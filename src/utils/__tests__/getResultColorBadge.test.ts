import { workspace } from "vscode";
import { getResultColorBadge } from "../getResultColorBadge";
import { PathColors } from "../../types";

jest.mock("vscode");

const config: PathColors[] = [
  {
    folderPath: "BB/src/core/sagas/bbbe/measurement-unit-core-saga.ts/",
    color: "foldercolorizer.color_3366ff",
  },
  {
    folderPath: "tsx",
    color: "foldercolorizer.color_66ccff",
    isForExtension: true,
  },
  {
    folderPath: "BB/src/core/sagas/bbbe/",
    badge: "AA",
    color: "foldercolorizer.color_33cc33",
  },
];

describe("userPathLessPath", () => {
  it("should return color from one path and badge from another", () => {
    expect(
      getResultColorBadge(
        "BB/src/core/sagas/bbbe/measurement-unit-core-saga.ts/",
        config
      )
    ).toEqual({
      color: "foldercolorizer.color_3366ff",
      badge: "AA",
    });
  });
});
