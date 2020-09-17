module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader"
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
};
