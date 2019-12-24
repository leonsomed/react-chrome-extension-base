const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // pages
    popup: path.resolve('src', 'entryPoints', 'popup.jsx'),
    newTab: path.resolve('src', 'entryPoints', 'newTab.jsx'),
    options: path.resolve('src', 'entryPoints', 'options.jsx'),
    devtools: path.resolve('src', 'entryPoints', 'devtools.jsx'),
    // scripts
    background: path.resolve('src', 'entryPoints', 'background.js'),
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
  },
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
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
    new CleanWebpackPlugin(),
    new WriteFilePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      allChunks: true,
    }),
    new CopyPlugin([
      {
        from: path.resolve('src', 'assets', 'manifest.json'),
        to: path.resolve('dist', 'manifest.json'),
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'assets', 'templates', 'default.html'),
      filename: 'newTab.html',
      chunks: ['newTab'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'assets', 'templates', 'default.html'),
      filename: 'options.html',
      chunks: ['options'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'assets', 'templates', 'default.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'assets', 'templates', 'default.html'),
      filename: 'devtools.html',
      chunks: ['devtools'],
      inject: true,
    }),
  ],
  devServer: {
    port: 4444,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
  },
  // https://developer.chrome.com/extensions/tut_debugging
  devtool: 'inline-source-map',
};
