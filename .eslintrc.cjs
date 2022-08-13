/*eslint-env node*/
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ["@zmrl", "@zmrl/eslint-config/jest", "@zmrl/eslint-config/react"],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        project: "tsconfig.eslint.json",
      },
    },
  ],
  ignorePatterns: ["dist"],
};
