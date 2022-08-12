/* eslint-env node */

module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
  testEnvironment: "jest-environment-jsdom",
};
