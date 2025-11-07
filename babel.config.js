// loose mode setting added due to errors building storybook: https://github.com/babel/babel/issues/11622
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        targets: { browsers: "defaults" },
        useBuiltIns: "entry",
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: ["babel-plugin-styled-components", "inline-json-import", "@babel/plugin-transform-runtime"],
  env: {
    test: {
      plugins: ["babel-plugin-styled-components", "require-context-hook"],
    },
  },
};
