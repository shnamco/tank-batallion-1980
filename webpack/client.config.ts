import path from 'path';
import webpack, {HotModuleReplacementPlugin, WebpackPluginInstance} from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const clientConfig = (_: undefined, { mode }: { mode: 'production' | 'development' }): webpack.Configuration => {
  const isProd = mode === 'production';
  const isDev = !isProd;

  const entry: string[] = ['./src/index.tsx'];

  const plugins: WebpackPluginInstance[] = [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(path.join('src', 'assets', 'favicon.ico')),
          to: path.resolve('dist')
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: path.resolve('src/**/*.{ts,tsx,js,jsx}')
      }
    }),
    new webpack.NormalModuleReplacementPlugin(/src\/environment\/environment\.ts/, isProd ? './environment.prod.ts' : './environment.ts')
  ];

  if (isProd) {
    plugins.push(
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        modifyURLPrefix: { auto: '/' },
        cleanupOutdatedCaches: true,
        exclude: [/\.map$/],
        navigationPreload: false
      })
    );
  } else {
    entry.push('react-hot-loader/patch');
    plugins.push(new HotModuleReplacementPlugin());
  }

  return {
    mode: isDev ? 'development' : 'production',
    entry,
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
        '@store': path.resolve('./src/store/'),
        'react-dom': '@hot-loader/react-dom'
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
          use: ['style-loader', 'css-loader', 'postcss-loader'],
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
          loader: 'babel-loader'
        }
      ]
    },
    plugins
  };
};

export default clientConfig;
