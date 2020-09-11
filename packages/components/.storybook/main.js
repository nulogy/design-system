module.exports = {
  stories: ["../src/**/*.story.js"],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.story\.js?$/]
        }
      }
    },
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "storybook-addon-performance"
  ]
};
