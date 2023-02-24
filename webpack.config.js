const { resolve } = require('path');

const options = {
  mode: process.env.NODE_ENV,
  entry: resolve('src', 'index.ts'),
  output: {
    path: resolve('www', 'js'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  watch: true
}

module.exports = options;