module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { browsers: "defaults" },
        useBuiltIns: "entry",
        corejs: 3
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: ["@babel/proposal-class-properties", "babel-plugin-styled-components"],
  env: {
    test: {
      plugins: ["@babel/proposal-class-properties", "babel-plugin-styled-components", "require-context-hook"]
    }
  }
};
