# 11 Testing_Jest

This sample series takes as starting point _10 HotLoader_

In this sample we are going to add unit testing with Jest:

- We will add configuration to work with Webpack TypeScript and Jest.
- We will add some unit tests:
    - actions
    - reducers
    - components

Summary steps:
- Add all the needed packages.
- Configure Jest.


# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _10 HotLoader_ and execute _npm install_.

Let's start by installing the testing libraries:

- [jest](https://github.com/facebook/jest): JavaScript Testing library with runner, assertion, mocks, etc.
- [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store): A mock store for testing your redux async action creators and middleware.
- [ts-jest](https://github.com/kulshekhar/ts-jest): A preprocessor with sourcemap support to help use Typescript with Jest.
- [@types/jest](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/jest/jest.d.ts): Typings for jest.
- [@types/redux-mock-store](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/redux-mock-store/redux-mock-store.d.ts): Typings for redux-mock-store.

## Configuration

- Jest typings configuration to work with [jest global declarations](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/11830):

### tsconfig.json
```javascript
{
  "compilerOptions": {
  ...
    "types": ["jest"]
  },
  ...
}
```

- Jest test commands:
  - `npm test`: to single run
  - `npm run test:watch`: to run all specs after changes.

NOTE:
> --watchAll To rerun all tests.

> --watch To rerun tests related to changed files.

> --verbose Display individual test results with the test suite hierarchy.

### package.json
```javascript
{
  ...
  "scripts": {
    ...
    "test": "jest --verbose",
    "test:watch": "jest --watchAll --verbose"
  }
  ...
}
```
