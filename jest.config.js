/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/*eslint-env node*/
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.ts"],
  testEnvironment: "jest-environment-jsdom",
};
