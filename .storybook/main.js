module.exports = {
  stories: ["../src/**/*.story.tsx", "../src/**/*.story.js"],
  webpackFinal: async (config) => {
    // Resolve error when webpack-ing storybook:
    // Can't import the named export 'Children' from non EcmaScript module (only
    // default export is available)
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.story\.js?$/, /\.story\.tsx?$/],
        },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "storybook-addon-performance",
    "./nds-theme/register.tsx",
  ],
};
