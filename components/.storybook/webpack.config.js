const path = require("path");
module.exports = {
  resolve: {
    alias: {
      ComponentsRoot: path.resolve(__dirname, "../../components/src"),
    },
  },
    module: {
      rules: [
        {
          test: /\.story\.js?$/,
          loaders: [require.resolve('@storybook/addon-storysource/loader')],
          enforce: 'pre',
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader'
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"]
        }
      ],
    },
  };