import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";

import packageJson from "./package.json";

const EXTENSIONS = [".js", ".jsx"];

const GLOBALS = {
  react: "React",
  "react-dom": "ReactDOM",
  "prop-types": "PropTypes",
  "styled-components": "styled"
};

const externals = Object.keys(GLOBALS);

const CORE_PLUGINS = [
  commonjs({
    include: [/node_modules/],
    namedExports: {
      "../node_modules/debounce/index.js": ["debounce"],
      "../node_modules/react-windowed-select/lib/index.js": ["components"]
    }
  }),
  babel({
    runtimeHelpers: true,
    exclude: "./node_modules/**/*",
    extensions: EXTENSIONS
  }),
  json(),
  replace({
    exclude: /node_modules/,
    ENV: JSON.stringify(process.env.NODE_ENV || "development")
  })
];

const ENTRY_FILE = "src/index.js";

const mainBundles = {
  input: ENTRY_FILE,
  external: externals,
  output: [
    {
      file: packageJson.main,
      name: "NDSComponents",
      format: "umd",
      globals: GLOBALS
    },
    {
      file: packageJson.module,
      format: "es",
      globals: GLOBALS
    }
  ],
  plugins: [
    resolve({
      mainFields: ["module", "main"],
      extensions: EXTENSIONS
    }),
    ...CORE_PLUGINS
  ]
};

export default [mainBundles];
