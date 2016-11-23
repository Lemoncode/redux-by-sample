# 16 Code coverage

This sample series takes as starting point _15 Testing Components_

We will add test coverage to our project.

Summary:

- Install the needed components.
- Configure karma to generate the tests.
- Create two karma configurations: simple and no coverage.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it


- Let's start by installing _istanbul-instrumenter-loader_ and _karma-coverage_

npm install karma-coverage istanbul-instrumenter-loader --save-dev

- in _karma.conf.js_ we need to update the pattern for the ts loader (just only specs),
the we will add a postLoader that will traverse through all the ts files (it won't evaluate
spec folders).

```javascript
// https://www.npmjs.com/package/istanbul-instrumenter-loader
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
```

The under reporters entry, let's add the following configuration:

```javascript
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
      type : 'html',
      dir : 'coverage/'
  },
```

Now we need to extend our _testindex.js_ in order to include the
all the ts files, regardless they are hit by the units tests or not.

```javascript
// require all modules ending in ".spec" from the
// current directory and all subdirectories

var testsContext = require.context("../src", true, /.spec$/);
testsContext.keys().forEach(testsContext);

// require all `project/src/components/**/index.js`
const componentsContext = require.context('../src', true, /.ts$/);

componentsContext.keys().forEach(componentsContext);
```

- Now let's give a try

```
npm start
```

- Once the test have been run check the _coverage_ folder you will find an html
file that will show you the actual coverage of your tests.
