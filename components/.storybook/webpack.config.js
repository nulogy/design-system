module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]]
      }
    },
    {
      test: /\.story\.js?$/,
      loaders: [require.resolve("@storybook/addon-storysource/loader")],
      enforce: "pre"
    },
    {
      test: /\.svg$/,
      loader: "svg-sprite-loader"
    },
    {
      test: /\.css$/,
      loaders: ["style-loader", "css-loader"]
    }
  );
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
