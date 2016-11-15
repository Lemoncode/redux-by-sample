# 12 Testing Infrastructure

This sample series takes as starting point _12 Testing Infrastructure_

We will add unit testing to our reducers.

Summary:

- Add a simple test to session reducer.
- Add deep-freeze check.
- Implement rest of unit tests for session reducer.
- Implement unit test support for student reducer.



# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Let's create start by creating a spec file and a first test, let's first import what we need.

_./src/reducers/spec/session.spec.ts_

```javascript
import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums'
import {sessionReducer} from '../session'

```

Now let's add a simple test

```javascript
```
