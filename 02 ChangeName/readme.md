# 02 Change Name

This sample takes as starting point _01 helloRedux_

In this sample we will add a component that will let us change the name of the
user.


Summary steps:

- Install object assign polyfill library plus typescript definition.
- Create a nameEdit presentational component.
- Create an action const file.
- Create an action dispatcher to get the name updated.
- Handle this action in the reducer.
- Create a nameEditContainer component to wire it up.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 Hello Redux_ and execute _npm install_.

- Let's install _object-assign_ and  typescript definitions:

```javascript
npm install object-assign --save
```

- Let's install typescript definitions for this libraries:

```
npm install @types/object-assign --save
```

-
