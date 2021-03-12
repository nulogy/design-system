import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const PEER_DEPENDENCIES = {
  react: "React",
  "styled-components": "styled",
  "@nulogy/icons": "icons",
  "react-dom": "reactDom",
};

const GLOBALS = {
  ...PEER_DEPENDENCIES,
  "@babel/runtime/helpers/typeof": "typeof",
  "@babel/runtime/helpers/defineProperty": "defineProperty",
  "@babel/runtime/helpers/classCallCheck": "classCallCheck",
  "@babel/runtime/helpers/createClass": "createClass",
  "@babel/runtime/helpers/slicedToArray": "slicedToArray",
  "@babel/runtime/helpers/objectWithoutProperties": "objectWithoutProperties",
  "@babel/runtime/helpers/objectWithoutPropertiesLoose":
    "objectWithoutPropertiesLoose",
  "@babel/runtime/helpers/extends": "extends",
  "@babel/runtime/helpers/assertThisInitialized": "assertThisInitialized",
  "@babel/runtime/helpers/inheritsLoose": "inheritsLoose",
};

const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".mjs"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      name: "NDSComponents",
      format: "umd",
      globals: GLOBALS,
    },
    {
      file: pkg.module,
      format: "es",
      globals: GLOBALS,
    },
  ],
  external: Object.keys(PEER_DEPENDENCIES),
  plugins: [
    /* typescript: see tsconfig.json for settings */
    typescript(),
    // resolve: resolves node_modules imports
    resolve({
      /* mainFields: specifies the which package fields to look for first
      package.module and then if it's not specified look at
      package.main */
      mainFields: ["module", "main"],
      /* modulesOnly: inspect resolved files are es2015 modules */
      // modulesOnly: true,
      /* extensions: specifies the file extensions to accept as imports */
      extensions: EXTENSIONS,
    }),
    /* commonJS: convert CommonJS modules to ES6,
    so they can be included in a Rollup bundle */
    commonjs({
      exclude: ["src/**"],
      /* include: include all items in node_modules folders (in entire monorepo) */
      include: ["./node_modules/**"],
      /* namedExports: sometimes commonjs can't resolve named exports from certain libraries, 
    ex: import {exportName} from "package-name"; => exportName module not found
    in those cases, it needs to be added as ["package-name"]: "exportName" here */
      namedExports: {
        debounce: ["debounce"],
        "react-windowed-select": ["components"],
        "body-scroll-lock": ["disableBodyScroll", "clearAllBodyScrollLocks"],
        "react-is": ["isValidElementType"]
      },
    }),
    /* babel: transiles the bundle according to babel.config */
    babel({
      /* babelHelpers: runtime tells babel to import from @babel/runtime instead of duplicated them */
      babelHelpers: "runtime",
      /* exclude: globs to exclude */
      exclude: "./node_modules/**",
    }),
    /* replace: replaces strings when bundling */
    replace({
      exclude: /node_modules/,
      /* ENV is replaced by environment setting */
      ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    }),
  ],
};
