const { defineConfig } = require("eslint/config");
const js = require("@eslint/js");

module.exports = defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        beforeEach: "readonly",
        it: "readonly",
        test: "readonly",
        require: "readonly",
        browser: "readonly",
        expect: "readonly"
      },
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);