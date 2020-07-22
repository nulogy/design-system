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
  plugins: [
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ],
  babelrcRoots: ["docs"]
};
