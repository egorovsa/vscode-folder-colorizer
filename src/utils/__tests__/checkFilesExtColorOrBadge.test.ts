import { checkFilesExtColorOrBadge } from "../checkFilesExtColorOrBadge";
import { PathColors } from "../../types";

jest.mock("vscode");

describe("checkFilesExtColorOrBadge", () => {
  jest.mock("vscode");

  describe("checkFilesExtColorOrBadge", () => {
    it("should return the correct badge and color for a file extension", () => {
      const pathColors: PathColors[] = [
        {
          isForExtension: true,
          folderPath: "js",
          badge: "JS",
          color: "yellow",
        },
        {
          isForExtension: true,
          folderPath: "ts",
          badge: "TS",
          color: "blue",
        },
      ];
      const result = checkFilesExtColorOrBadge("file.ts", pathColors);
      expect(result).toEqual({ badge: "TS", color: "blue" });
    });

    it("should return empty badge and color if no matching extension is found", () => {
      const pathColors: PathColors[] = [
        {
          isForExtension: true,
          folderPath: "jsx",
          badge: "JSX",
          color: "yellow",
        },
      ];
      expect(checkFilesExtColorOrBadge("file.ts", pathColors)).toEqual({
        badge: "",
        color: "",
      });

      expect(checkFilesExtColorOrBadge("file.js", pathColors)).toEqual({
        badge: "",
        color: "",
      });
    });

    it("should return empty badge and color for a folder path", () => {
      const pathColors: PathColors[] = [
        {
          isForExtension: true,
          folderPath: "js",
          badge: "JS",
          color: "yellow",
        },
      ];
      const result = checkFilesExtColorOrBadge("folder/", pathColors);
      expect(result).toEqual({ badge: "", color: "" });
    });
  });
});
