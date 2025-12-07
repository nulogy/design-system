import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default tseslint.config(
  // Base recommended configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Main configuration for all JS/TS/TSX files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // TypeScript rules
      // ban-types was deprecated in v8, replaced with no-empty-object-type
      // Original config allowed {} type, so we disable the rule that bans it
      "@typescript-eslint/no-empty-object-type": "off",
      // Set no-explicit-any to warn instead of error
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow unused variables that start with underscore
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // React rules
      "react/display-name": "off",
      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],

      // JSX A11y rules
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          labelComponents: [],
          labelAttributes: ["labelText"],
          controlComponents: ["FieldLabel"],
          assert: "either",
        },
      ],
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["as", "to"],
        },
      ],

      // Prettier - do not mark formatting violations as errors
      "prettier/prettier": "off",
    },
  },

  // Allow @ts-nocheck in files that need it (legacy code that would require significant refactoring)
  {
    files: [
      "src/Popper/Popper.tsx",
      "src/Tabs/Tabs.tsx",
      "src/Tabs/TabScrollIndicators.tsx",
      "src/TimePicker/TimePicker.tsx",
      "src/TimePicker/TimePickerDropdown.tsx",
    ],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },

  // Ignore patterns (moved from .eslintignore)
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/storybook-static/**",
      "**/public/**",
      "**/cypress/**",
      "**/__image_snapshots__/**",
      "**/*.log",
      "**/.DS_Store",
      "**/.idea/**",
      "**/logs/**",
      "**/typings/**",
      "**/jspm_packages/**",
      "**/bower_components/**",
    ],
  }
);
