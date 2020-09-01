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
    "@babel/preset-react"
  ],
  plugins: [
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-private-property-in-object",
    "@babel/plugin-transform-runtime"
  ],
  babelrcRoots: ["docs"]
};
