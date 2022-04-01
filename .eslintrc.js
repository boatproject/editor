/*eslint-env node*/
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:storybook/recommended",
    "plugin:jest-dom/recommended",
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
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "react-hooks/exhaustive-deps": [
          "warn",
          {
            additionalHooks: "(useEventCallback)",
          },
        ],
      },
    },
  ],
};
