const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

export default {
  client: [
    {
      test: /\.p?css$/,
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
  ],
  server: [
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.p?css$/,
      loader: 'null-loader',
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      loader: 'null-loader'
  },
  ]
};
