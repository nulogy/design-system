module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        targets: { browsers: "defaults" },
        useBuiltIns: "entry"
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-class-properties",
    "inline-json-import",
    "@babel/plugin-transform-runtime"
  ],
  env: {
    test: {
      plugins: ["babel-plugin-styled-components", "require-context-hook"]
    }
  }
};
