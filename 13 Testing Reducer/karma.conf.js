
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      './test_index.js'
    ],
    exclude: [
    ],
    preprocessors: {
      './test_index.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'awesome-typescript-loader',
              options: {
                useBabel: true,
              },
            },
          },
          {
            test: /\.css$/,
            include: /node_modules/,
            loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: {
                loader: 'css-loader',
              },
            }),
          },
          // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
          // Using here url-loader and file-loader
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
          },
        ],
        //Configuration required to import sinon on spec.ts files
        noParse: [
          /node_modules(\\|\/)sinon/,
        ]
      },
      resolve: {
        //Added .json extension required by cheerio (enzyme dependency)
        extensions: ['.js', '.ts', '.tsx'],
        //Configuration required to import sinon on spec.ts files
        // https://github.com/webpack/webpack/issues/304
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },
      //Configuration required by enzyme
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
      }
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
