module.exports = {
  stories: ["../src/**/*.story.js"],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "storybook-addon-performance"
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader")
        },
        // Optional
        {
          loader: require.resolve("react-docgen-typescript-loader")
        }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
