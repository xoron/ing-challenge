module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:import/recommended", "eslint:recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".json"],
      },
    },
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unused-modules": ["warn", {"unusedExports": true}],
    "no-unused-vars": ["warn", { "vars": "all" }]
  },
};
