import { filterIncludedPaths } from "../filterIncludedPaths";

describe("filterIncludedPaths", () => {
  it("should return an empty array when given an empty array", () => {
    expect(filterIncludedPaths([])).toEqual([]);
  });

  it("should return the same array when no paths are included in each other", () => {
    const paths = ["/a", "/b", "/c"];
    expect(filterIncludedPaths(paths)).toEqual(paths);
  });

  it("should filter out paths that are included in other paths", () => {
    const paths = ["/a", "/a/b", "/a/b/c", "/d"];
    expect(filterIncludedPaths(paths)).toEqual(["/a", "/d"]);
  });

  it("should filter out paths that are included in other paths, case1", () => {
    const paths = ["/a/", "/da/c/", "/a/b/", "/a/b/c/", "/d/"];
    expect(filterIncludedPaths(paths)).toEqual(["/a/", "/da/c/", "/d/"]);
  });

  it("should handle paths with similar prefixes correctly", () => {
    const paths = ["/a/", "/ab/", "/abc/", "/abcd/"];
    expect(filterIncludedPaths(paths)).toEqual([
      "/a/",
      "/ab/",
      "/abc/",
      "/abcd/",
    ]);
  });

  it("should handle paths with similar prefixes correctly", () => {
    const paths = ["/abcd/", "/ab/", "/abc/", "/a/"];
    expect(filterIncludedPaths(paths)).toEqual([
      "/abcd/",
      "/ab/",
      "/abc/",
      "/a/",
    ]);
  });

  it("should handle paths with different lengths correctly", () => {
    const paths = ["/a/b/c", "/a/b", "/a", "/d/e/f", "/d/e"];
    expect(filterIncludedPaths(paths)).toEqual(["/a", "/d/e"]);
  });

  it("should handle paths with different lengths correctly, random ordering", () => {
    const paths = ["/a/b", "/a/b/c", "/a", "/d/e/f", "/d/e"];
    expect(filterIncludedPaths(paths)).toEqual(["/a", "/d/e"]);
  });

  it("should handle paths with special characters correctly", () => {
    const paths = ["/a-b", "/a-b/c", "/a_b", "/a_b/c"];
    expect(filterIncludedPaths(paths)).toEqual(["/a-b", "/a_b"]);
  });
});
