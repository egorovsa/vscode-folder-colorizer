export const normalizeFileRulePath = (value: string): string =>
  value.replace(/[\\/]+$/, "");
