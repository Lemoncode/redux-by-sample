var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: [
      './test/test_index.js',
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js'
    ],
    exclude: [
    ],
    preprocessors: {
      './test/test_index.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
          loaders: [
              {
                  test: /\.spec\.(ts|tsx)$/,
                  exclude: /node_modules/,
                  loader: 'ts-loader'
            },
            //Configuration required by enzyme
            {
                test: /\.json$/,
                loader: 'json'
            }
          ],
          //Configuration required to import sinon on spec.ts files
          noParse: [
              /node_modules(\\|\/)sinon/,
          ],
          // https://www.npmjs.com/package/istanbul-instrumenter-loader
          postLoaders: [
            {
                  test: /\.(ts|tsx)/,
                  exclude: /(node_modules|spec)/,
                  loaders: ['istanbul-instrumenter','ts-loader']
            }
          ],
      },
      resolve: {
          //Added .json extension required by cheerio (enzyme dependency)
          extensions: ['', '.js', '.ts', '.tsx', '.json'],
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

    reporters: ['mocha', 'coverage'],
    coverageReporter: {
        type : 'html',
        dir : 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
