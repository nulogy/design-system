module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": { "browsers": "defaults" },
         "useBuiltIns": "entry" }
    ],
    "@babel/preset-react"
  ],
  "env": {
    "test": {
      "plugins": [
        "require-context-hook"
      ]
    }
  }
};