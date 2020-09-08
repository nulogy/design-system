module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { browsers: "defaults" },
        useBuiltIns: "entry"
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: ["babel-plugin-styled-components", "inline-json-import", "@babel/plugin-transform-runtime"],
  env: {
    test: {
      plugins: ["babel-plugin-styled-components", "require-context-hook"]
    }
  }
};
