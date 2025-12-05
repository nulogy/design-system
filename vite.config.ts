import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const PEER_DEPENDENCIES = {
  react: "React",
  "styled-components": "styled",
  "@nulogy/icons": "icons",
};

const GLOBALS = {
  ...PEER_DEPENDENCIES,
  "deep-equal": "deepEqual",
  "create-react-context": "createReactContext",
  warning: "warning",
  exenv: "exenv",
  classnames: "t",
  "html-parse-stringify2": "HTML",
  "react-fast-compare": "isEqual",
  "path-to-regexp": "pathToRegexp",
  "react-is": "reactIs",
  "react-dom": "reactDom",
};

const externals = Object.keys(GLOBALS);

export default defineConfig({
  plugins: [react()],
  define: {
    ENV: JSON.stringify(process.env.NODE_ENV || "development"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NDSComponents",
      formats: ["umd", "es"],
      fileName: (format) => {
        if (format === "umd") {
          return "main.js";
        }
        return "main.module.js";
      },
    },
    rollupOptions: {
      external: externals,
      output: {
        globals: GLOBALS,
      },
    },
    sourcemap: true,
    minify: false,
    target: "es2020",
  },
  test: {
    environment: "jsdom",
    globals: false,
    include: ["**/*.spec.tsx", "**/*.spec.ts"],
    exclude: ["**/node_modules/**", "**/cypress/**", "**/dist/**"],
    setupFiles: [resolve(__dirname, "spec/support/vitestAutoCleanup.ts")],
  },
});
