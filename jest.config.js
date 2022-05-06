/* eslint-env node */

module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.ts"],
  testEnvironment: "jest-environment-jsdom",
};
