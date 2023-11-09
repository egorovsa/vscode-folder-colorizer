module.exports = {
  roots: ["<rootDir>/src"],
  moduleNameMapper: {},
  setupFilesAfterEnv: [
    // '<rootDir>/src/setupTests.tsx',
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
      },
    ],
  },
  preset: "ts-jest",
};
