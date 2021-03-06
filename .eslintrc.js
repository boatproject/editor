/*eslint-env node*/
/**
 * @type {import('eslint').Linter.BaseConfig}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jest-dom/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 13,
        sourceType: "module",
      },
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {},
    },
  ],
};
