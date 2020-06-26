module.exports = {
  stories: ["../src/**/*.story.js"],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "./addons/register.js"
  ]
};
