module.exports = {
  output: {
    libraryTarget: "umd"
  },
  externals: [
    "react",
    "react-dom",
    "styled-components"
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
