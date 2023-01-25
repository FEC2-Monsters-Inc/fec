const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      }
    ]
  }
}