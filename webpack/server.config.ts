const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const loaders = require('./loaders');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const plugins = [
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/sw.js')
      }
    ]
  }),
  new HTMLWebpackPlugin({
    template: isDev ? path.resolve(__dirname, 'src/index_dev.html') : path.resolve(__dirname, 'src/index.html'),
    minify: {
      removeComments: isProd,
      collapseWhitespace: isProd
    }
  }),
  new CleanWebpackPlugin(),
  new ForkTsCheckerWebpackPlugin({
    async: false,
    eslint: {
      files: path.resolve(__dirname, 'src/**/*.{ts,tsx,js,jsx}')
    }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (isProd) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'ssr.ts'),
  // entry: path.resolve(__dirname, 'src/index.tsx'),
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@core': path.resolve(__dirname, './src/core/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@service': path.resolve(__dirname, './src/service/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@store': path.resolve(__dirname, './src/store/')
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      fs: false,
      path: false,
      assert: false
    }
  },
  module: {
    rules: loaders.server
  },
  plugins,
  devServer: {
    open: true,
    port: 3000,
    hot: isDev,
    historyApiFallback: true
  }
};
