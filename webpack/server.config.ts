import path from 'path';
import webpack, { Configuration } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import loaders from './loaders';

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const plugins: any[] = [
  new HTMLWebpackPlugin({
    template: isDev ? path.resolve(__dirname, '../src/index_dev.html') : path.resolve(__dirname, '../src/index.html'),
    minify: {
      removeComments: isProd,
      collapseWhitespace: isProd
    }
  }),
  new ForkTsCheckerWebpackPlugin({
    async: false,
    eslint: {
      files: path.resolve(__dirname, '../src/**/*.{ts,tsx,js,jsx}')
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

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  externalsPresets: { node: true },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
  entry: path.resolve(__dirname, '../src/server'),
  module: {
    rules: loaders.server
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
    library: {
      type: 'commonjs2'
    }
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components/'),
      '@pages': path.resolve(__dirname, '../src/pages/'),
      '@core': path.resolve(__dirname, '../src/core/'),
      '@styles': path.resolve(__dirname, '../src/styles/'),
      '@service': path.resolve(__dirname, '../src/service/'),
      '@utils': path.resolve(__dirname, '../src/utils/'),
      '@store': path.resolve(__dirname, '../src/store/')
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  plugins,
};

export default config;
