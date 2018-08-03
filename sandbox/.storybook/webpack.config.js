const path = require("path");

const srcPath = path.resolve('src');
const nodeModules = path.resolve('node_modules')
const rootNodeModules = path.resolve('../node_modules')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" }, 
          {
            loader: "sass-loader",
            options: {
              includePaths: [srcPath]
            }
          },
          { loader: "js-to-styles-var-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' }, 
          { loader: 'css-loader' }, 
          { 
            loader: 'less-loader', 
            options: {
              paths: [
                srcPath,
                nodeModules,
                rootNodeModules
              ]
            }
          },
          { loader: "js-to-styles-var-loader" }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", "css-loader"
        ],
      }
    ]
  }
};