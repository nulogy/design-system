const path = require("path");

module.exports = {
  target: "node", // https://github.com/emotion-js/emotion/issues/1113
  output: {
    libraryTarget: "umd",
    globalObject: "(typeof self !== 'undefined' ? self : this)"
    // https://github.com/markdalgleish/static-site-generator-webpack-plugin/issues/130
  },
  externals: ["react", "react-dom", "styled-components"],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"]
          }
        }
      },
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve("@storybook/addon-storysource/loader")],
        enforce: "pre"
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader"
      }
    ]
  }
};
