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
  plugins: [
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-private-property-in-object",
    "inline-json-import",
    "@babel/plugin-transform-runtime"
  ],
  env: {
    test: {
      plugins: ["babel-plugin-styled-components", "require-context-hook"]
    }
  }
};
