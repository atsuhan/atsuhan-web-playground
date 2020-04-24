'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const routeDataMapper = require('webpack-route-data-mapper');
const readConfig = require('read-config');
const path = require('path');

// base config
const SRC = './src';
const DEST = './public';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const constants = readConfig(`${SRC}/constants.yml`);
const { MODE, BASE_DIR, ENTRY } = constants;

// page/**/*.pug -> dist/**/*.html
const htmlTemplates = routeDataMapper({
  baseDir: `${SRC}/pug/page`,
  src: '**/[!_]*.pug',
  options: {
    inject: false
  },
  locals: Object.assign({}, constants, {
    meta: readConfig(`${SRC}/pug/meta.yml`),
    keys: readConfig('keys.json')
  })
});

module.exports = {
  mode: MODE,
  // エントリーファイル
  entry: ENTRY,
  // 出力するディレクトリ・ファイル名などの設定
  output: {
    path: path.resolve(__dirname, DEST + BASE_DIR),
    filename: '[name]',
    publicPath: BASE_DIR
  },
  module: {
    // 各ファイル形式ごとのビルド設定
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: MODE === 'production',
          cacheDirectory: true
        }
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              root: path.resolve(`${SRC}/pug/`),
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [`${SRC}/scss`]
              }
            }
          ]
        })
      },
      {
        test: /.ya?ml$/,
        loader: 'js-yaml-loader'
      }
    ]
  },
  // webpack-dev-serverの設定
  devServer: {
    host: HOST,
    port: PORT,
    contentBase: DEST,
    openPage: path.relative('/', BASE_DIR),
    disableHostCheck: true
  },
  // キャシュ有効化
  cache: true,
  // 拡張子省略時のpath解決
  resolve: {
    extensions: ['.js', '.json', '*'],
    alias: {
      '@': path.join(__dirname, SRC)
    }
  },

  plugins: [
    // build先のディレクトリを綺麗に(削除)する。
    new CleanWebpackPlugin(),
    // staticをbuild先にコピーする。
    new CopyWebpackPlugin([
      {
        from: path.resolve(`${SRC}/static`),
        to: path.resolve(DEST)
      }
    ]),
    // 複数のHTMLファイルを出力する
    ...htmlTemplates,
    // style.cssを出力
    new ExtractTextPlugin('[name]')
  ]
};
