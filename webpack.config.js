const baseConfig = {
  output: {
    libraryTarget: "umd"
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
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};

const serverConfig = Object.assign({}, baseConfig, { target: "node" });
serverConfig.output = Object.assign({}, serverConfig.output, {
  filename: "main.js"
});

const clientConfig = Object.assign({}, baseConfig, { target: "web" });
clientConfig.output = Object.assign({}, clientConfig.output, {
  filename: "main.browser.js"
});

module.exports = [serverConfig, clientConfig];
