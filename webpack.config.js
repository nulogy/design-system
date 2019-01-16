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
          loader: "babel-loader",
          options: {
            presets: ['@babel/react']
          }
        }
      },
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },      
    ]
  }
}