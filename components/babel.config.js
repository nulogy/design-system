module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { browsers: "defaults" },
        useBuiltIns: "entry"
      }
    ],
    "@babel/preset-react"
  ],
  plugins: ["babel-plugin-styled-components", "@babel/plugin-proposal-class-properties", "inline-json-import"],
  env: {
    test: {
      plugins: ["babel-plugin-styled-components", "require-context-hook"]
    }
  }
};
