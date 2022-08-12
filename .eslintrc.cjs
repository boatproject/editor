/*eslint-env node*/
/**
 * @type {import('eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: ["@zmrl", "@zmrl/eslint-config/jest", "@zmrl/eslint-config/react"],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
};
