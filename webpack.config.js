const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const plugins = [
  new HTMLWebpackPlugin({
    template: isDev ? path.resolve(__dirname, 'src/index.html') : path.resolve(__dirname, 'src/index_prod.html'),
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
  }),
  new webpack.NormalModuleReplacementPlugin(
    /src\/environment\/environment\.ts/,
    isProd ? './environment.prod.ts' : './environment.ts'
  )
];

if (isProd) {
  // enable in production only
  plugins.push(
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/sw.js')
        }
      ]
    }),
  );
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.tsx'),
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
      '@services': path.resolve(__dirname, './src/services/'),
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
    rules: [
      {
        test: /\.pcss$/,
        include: /src/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        exclude: /node_modules/,
        sideEffects: true
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
  },
  plugins,
  devServer: {
    disableHostCheck: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'src')
  }
};
