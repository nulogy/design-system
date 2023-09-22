module.exports = {
  stories: ["../src/**/*.story.tsx", "../src/**/*.story.js"],
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
    "./nds-theme/register.js",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};
