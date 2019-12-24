const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/images',
          outputPath: './images',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
              modules: {
                localIdentName: '[local]__[hash:base64]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new Dotenv(),
  ],
  // https://developer.chrome.com/extensions/tut_debugging
  devtool: 'inline-source-map',
};
