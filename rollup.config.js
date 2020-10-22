import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import typescript from "rollup-plugin-typescript2";

/* Rollup outputs module and main bundles for the @nulogy/components package */
import packageJson from "./package.json";

const GLOBALS = {
  react: "React",
  "react-dom": "ReactDOM",
  "prop-types": "PropTypes",
  "styled-components": "styled",
  "react-windowed-select": "components",
  "@babel/runtime/helpers/typeof": "typeof",
  "@babel/runtime/helpers/defineProperty": "defineProperty",
  "@babel/runtime/helpers/classCallCheck": "classCallCheck",
  "@babel/runtime/helpers/createClass": "createClass",
  "@babel/runtime/helpers/slicedToArray": "slicedToArray",
  "@babel/runtime/helpers/objectWithoutProperties": "objectWithoutProperties",
  "object-assign": "assign",
  "@babel/runtime/helpers/objectWithoutPropertiesLoose": "objectWithoutPropertiesLoose",
  "@babel/runtime/helpers/extends": "extends",
  "@babel/runtime/helpers/assertThisInitialized": "assertThisInitialized",
  "@babel/runtime/helpers/inheritsLoose": "inheritsLoose",
  "deep-equal": "deep-equal",
  "create-react-context": "createContext",
  warning: "warning",
  exenv: "exenv",
  classnames: "t",
  "react-input-autosize": "AutosizeInput",
  "html-parse-stringify2": "HTML",
  "smoothscroll-polyfill": "smoothscroll",
};

const externals = Object.keys(GLOBALS);

const EXTENSIONS = [".js", ".jsx", "ts", ".tsx", ".mjs"];

const CORE_PLUGINS = [
  /* typescript: see tsconfig.json for settings */
  typescript(),
  /* commonJS: convert CommonJS modules to ES6,
  so they can be included in a Rollup bundle */
  commonjs({
    /* include: include all items in node_modules folders (in entire monorepo) */
    include: [/node_modules/],
    /* namedExports: sometimes commonjs can't resolve named exports from certain libraries, 
    ex: import {exportName} from "package-name"; => exportName module not found
    in those cases, it needs to be added as ["package-name"]: "exportName" here */
    namedExports: {
      debounce: ["debounce"],
      "react-windowed-select": ["components"],
    },
  }),
  /* babel: transiles the bundle according to babel.config */
  babel({
    /* babelHelpers: runtime tells babel to import from @babel/runtime instead of duplicated them */
    babelHelpers: "runtime",
    /* exclude: globs to exclude */
    exclude: ["./node_modules/**/*"],
    /* exclude: files to be transpiled by babel */
    extensions: EXTENSIONS,
  }),
  /* replace: replaces strings when bundling */
  replace({
    exclude: /node_modules/,
    /* ENV is replaced by environment setting */
    ENV: JSON.stringify(process.env.NODE_ENV || "development"),
  }),
];

const ENTRY_FILE = "src/index.ts";

const mainBundles = {
  /* input: main export file */
  input: ENTRY_FILE,
  /* external: external dependencies, all peerDependencies */
  external: externals,
  output: [
    // UMD format for compatibility with most script loaders
    {
      file: packageJson.main,
      name: "NDSComponents",
      format: "umd",
      // globals: global variable names of external dependencies
      globals: GLOBALS,
    },
    // ES module format for package.module field, auto-imports and optimal tree-shaking
    {
      file: packageJson.module,
      format: "es",
      globals: GLOBALS,
    },
  ],
  plugins: [
    // resolve: resolves node_modules imports
    resolve({
      /* mainFields: specifies the which package fields to look for first
      package.module and then if it's not specified look at
      package.main */
      mainFields: ["module", "main"],
      /* modulesOnly: inspect resolved files are es2015 modules */
      modulesOnly: true,
      /* extensions: specifies the file extensions to accept as imports */
      extensions: EXTENSIONS,
    }),
    ...CORE_PLUGINS,
  ],
};

export default [mainBundles];
