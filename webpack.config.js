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
      }
    ]
  }
};

const serverConfig = Object.assign({}, baseConfig, {
  target: "node",
  mode: "development"
});
serverConfig.output = Object.assign({}, serverConfig.output, {
  filename: "main.js"
});

const clientConfig = Object.assign({}, baseConfig, {
  target: "web",
  mode: "development"
});
clientConfig.output = Object.assign({}, clientConfig.output, {
  filename: "main.browser.js"
});

const serverConfigProd = Object.assign({}, baseConfig, {
  target: "node",
  mode: "production"
});
serverConfigProd.output = Object.assign({}, serverConfig.output, {
  filename: "main.min.js"
});

const clientConfigProd = Object.assign({}, baseConfig, {
  target: "web",
  mode: "production"
});
clientConfigProd.output = Object.assign({}, clientConfig.output, {
  filename: "main.browser.min.js"
});

module.exports = [
  serverConfig,
  clientConfig,
  serverConfigProd,
  clientConfigProd
];
