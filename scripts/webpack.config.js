const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const AssetsPlugin = require('assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const paths = {
  appSrc: resolveApp('src'),
  appBuild: resolveApp('build'),
  appIndexJs: resolveApp('src/index.js'),
  appNodeModules: resolveApp('node_modules')
};

const DEV = process.env.NODE_ENV === 'developement';

// babel transformation
const js_loader = {
  test: /.js?$/,
  loader: 'babel-loader',
  include: path.appSrc,
};

// scss / sass loader
const sass_loader = {
  test: /.(scss|css|sass)$/,
  use: ExtractTextPlugin({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          minimize: DEV
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9',
              ],
            }),
          ],
        },
      },
      'sass-loader',
    ]
  })
}

module.exports = {
  bail: !DEV,
  target: web,
  devtool: DEV ? 'cheap-eval-source-map' : 'source-map',
  entry: [paths.appIndexJs],
  output: {
    path: paths.appBuild,
    filename: DEV ? 'bundle.js' : 'bundle.[hash:8].js'
  },
  module: {
    rules: [
      // Disabling requier.ensure as it's not a standard language feature
      { parser: { requireEnsure: false } },
      // Transform ES6 with Babel
      js_loader,
      sass_loader,
    ]
  },
  plugins: [
    !DEV && new CleanWebpackPlugin(['build']),
    new ExtractTextPlugin(DEV ? 'bundle.css' : 'bundle.[hash:8].css'),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new AssetsPlugin({
      path: paths.appBuild,
      filename: 'assets.json',
    }),
    !DEV &&
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
        sourceMap: true,
      }),
      DEV &&
        new FriendlyErrorsPlugin({
          clearConsole: false,
        }),
        DEV &&
          new BrowserSyncPlugin({
            notify: false,
            host: 'localhost',
            port: 4000,
            logLevel: 'silent',
            files: ['./*.php'],
            proxy: 'http://localhost:9009/',
          }),
  ].filter(Boolean),
};
