/* eslint-disable */
const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader"
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
};
