import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const clientConfig = (_: undefined, { mode }: { mode: 'production' | 'development' }): webpack.Configuration => {
  const isProd = mode === 'production';
  const isDev = !isProd;

  const plugins = [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: path.resolve('src/**/*.{ts,tsx,js,jsx}')
      }
    }),
    new webpack.NormalModuleReplacementPlugin(/src\/environment\/environment\.ts/, isProd ? './environment.prod.ts' : './environment.ts')
  ];

  if (isProd) {
    // enable in production only
    plugins.push(
      // @ts-ignore
      new MiniCssExtractPlugin()
    );
  }

  return {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve('src/index.tsx'),
    devtool: 'source-map',
    target: 'web',
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js',
      assetModuleFilename: 'assets/[name][ext]'
    },
    resolve: {
      alias: {
        '@components': path.resolve('./src/components/'),
        '@pages': path.resolve('./src/pages/'),
        '@core': path.resolve('./src/core/'),
        '@styles': path.resolve('./src/styles/'),
        '@services': path.resolve('./src/services/'),
        '@utils': path.resolve('./src/utils/'),
        '@store': path.resolve('./src/store/')
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
    plugins
  };
};

export default clientConfig;
