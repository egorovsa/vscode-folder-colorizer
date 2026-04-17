import { checkFileColorOrBadge } from "../checkFileColorOrBadge";
import { PathColors } from "../../types";

jest.mock("vscode");

describe("checkFileColorOrBadge", () => {
  jest.mock("vscode");

  describe("checkFileColorOrBadge", () => {
    it("should return empty badge and color for non-file paths", () => {
      const result = checkFileColorOrBadge("folder", []);
      expect(result).toEqual({ badge: "", color: "" });
    });

    it("should return empty badge and color if pathColors is empty", () => {
      const result = checkFileColorOrBadge("file.txt", []);
      expect(result).toEqual({ badge: "", color: "" });
    });

    it("should return correct badge and color if path is found in pathColors", () => {
      const path = "/this/is/folder/file.txt/";
      const pathColors: PathColors[] = [
        {
          folderPath: "/this/is/folder/file.txt",
          badge: "badge1",
          color: "color1",
        },
      ];
      const result = checkFileColorOrBadge(path, pathColors);
      expect(result).toEqual({ badge: "badge1", color: "color1" });
    });

    it("should match the same file with and without trailing slash", () => {
      const path = "folder/file.ts";
      const pathColors: PathColors[] = [
        {
          folderPath: "folder/file.ts/",
          badge: "TS",
          color: "blue",
        },
      ];

      const result = checkFileColorOrBadge(path, pathColors);
      expect(result).toEqual({ badge: "TS", color: "blue" });
    });

    it("should return empty badge and color if path is not found in pathColors", () => {
      const path = "this/is/folder/file.txt/";
      const pathColors: PathColors[] = [
        {
          folderPath: "this/is/folder/file.tx/",
          badge: "badge1",
          color: "color1",
        },
      ];
      const result = checkFileColorOrBadge(path, pathColors);
      expect(result).toEqual({ badge: "", color: "" });
    });
  });
});
