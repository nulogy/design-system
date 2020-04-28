import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";

import * as dateFns from "date-fns";

import packageJson from "./package.json";

const extensions = [".js", ".jsx"];

const EXTERNALS = ["react", "react-dom", "prop-types", "styled-components"];

const GLOBALS = {
  react: "React",
  "react-dom": "ReactDOM",
  "prop-types": "PropTypes",
  "styled-components": "styled"
};

const CORE_PLUGINS = [
  commonjs({
    include: [/node_modules/],
    namedExports: {
      "../node_modules/debounce/index.js": ["debounce"],
      "../node_modules/react-windowed-select/lib/index.js": ["components"],
      "../node_modules/react-i18next/dist/commonjs/index.js": ["I18nextProvider", "useTranslation"],
      "../node_modules/react-popper/lib/cjs/index.js": ["Manager", "Reference", "Popper"],
      "node_modules/date-fns/locale/index.js": ["enUS", "de", "fr", "es", "ptBR", "ro", "pl", "nl"],
      "node_modules/date-fns/index.js": Object.keys(dateFns)
    }
  }),
  babel({
    runtimeHelpers: true,
    exclude: "./node_modules/**/*",
    extensions
  }),
  json(),
  replace({
    exclude: /node_modules/,
    ENV: JSON.stringify(process.env.NODE_ENV || "development")
  })
];

const ENTRY_FILE = "src/index.js";

const baseConfig = {
  input: ENTRY_FILE,
  external: EXTERNALS
};

const mainBundles = {
  ...baseConfig,
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
      sourcemap: true,
      globals: GLOBALS
    }
  ],
  plugins: [
    ...CORE_PLUGINS,
    resolve({
      mainFields: ["main", "module"],
      extensions
    })
  ]
};

export default [mainBundles];
