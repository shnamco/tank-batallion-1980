const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: path.resolve(__dirname, 'src/**/*')
      }
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
