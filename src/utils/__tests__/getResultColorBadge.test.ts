import { getResultColorBadge } from "../getResultColorBadge";
import { PathColors } from "../../types";

jest.mock("vscode");

const config: PathColors[] = [
  {
    folderPath: "BB/src/core/sagas/bbbe/measurement-unit-core-saga.ts/",
    color: "TSFILECOLOR",
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
  {
    folderPath: "json",
    color: "JSONCOLOR",
    isForExtension: true,
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
});
