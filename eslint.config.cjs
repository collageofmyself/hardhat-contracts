const { defineConfig } = require("eslint/config");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettierRecommended = require("eslint-plugin-prettier/recommended");
const n = require("eslint-plugin-n");
const globals = require("globals");

module.exports = defineConfig([
  {
    ignores: [
      "node_modules/**",
      "artifacts/**",
      "cache/**",
      "coverage/**",
      "typechain-types/**",
      "typechain/**",
    ],
  },
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      n,
    },
    rules: {
      "n/no-unsupported-features/es-syntax": [
        "error",
        { ignores: ["modules"] },
      ],
    },
  },
  prettierRecommended,
]);
