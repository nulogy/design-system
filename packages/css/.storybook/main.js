module.exports = {
  stories: ["../src/scss/**/*.story.js"],
  addons: [{
    name: "@storybook/addon-storysource",
    options: {
      rule: {
        test: [/\.story\.js?$/]
      }
    }
  },"@storybook/addon-viewport"]
};
