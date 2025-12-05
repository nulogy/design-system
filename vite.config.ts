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

// External function - all peer dependencies are externalized
// Also externalize react/jsx-runtime in case any dependencies use automatic JSX
const external = (id: string) => {
  // Externalize react/jsx-runtime and react/jsx-dev-runtime
  // This ensures that if any dependencies use automatic JSX, they'll use the consumer's React
  if (id === "react/jsx-runtime" || id === "react/jsx-dev-runtime") {
    return true;
  }
  return externals.includes(id);
};

export default defineConfig({
  plugins: [react()],
  define: {
    ENV: JSON.stringify(process.env.NODE_ENV || "development"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
  },
  build: {
    emptyOutDir: false,
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
      external,
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
