/**
 * Filters out paths that are included within other paths in the given array.
 *
 * @param paths - An array of string paths to be filtered.
 * @returns An array of paths that are not sub-paths of any other path in the input array.
 * 
 * @example
 * const paths = [
 *   '/Work/folder-colorizer/src',
 *   '/Work/folder-colorizer/src/utils',
 *   '/Work/folder-colorizer/src/utils/filterIncludedPaths.ts',
 *   '/Work/folder-colorizer/test'
 * ];
 * const result = filterIncludedPaths(paths);
 * console.log(result); 
 * // Output: [
 * //   '/Work/folder-colorizer/src',
 * //   '/Work/folder-colorizer/test'
 * // ]
 */
export const filterIncludedPaths = (paths: string[]) => {
  const filteredPaths = paths.filter((path, index) => {
    return !paths.some(
      (otherPath, otherIndex) =>
        otherIndex !== index && path.startsWith(otherPath)
    );
  });
  return filteredPaths;
};
