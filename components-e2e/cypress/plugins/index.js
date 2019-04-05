// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpack = require("@cypress/webpack-preprocessor");

/**
 * We need to use the same preprocessor capabilities as create-react-app.
 * Note: ES7, partial decorator support.
 */
const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
          // Macros for styled components
          // See: https://www.styled-components.com/docs/tooling#babel-macro
          plugins: ["macros"],
        },
      },
    ],
  },
};

/**
 * Place to inject the apps webpack.config.js.
 * Note: Not really necessary for this code challange.
 */
const options = {
  webpackOptions,
  // We use cra's live reload
  watchOptions: {},
};

module.exports = on => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("file:preprocessor", webpack(options));
};
