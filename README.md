# global-npx

[![NPM version](https://badge.fury.io/js/global-npx.svg)](https://www.npmjs.com/package/global-npx)

Run npx commands from within a Nodejs application

## Usage

```js
import npx from 'global-npx';

npx('create-react-app');
```

## Why?

I once needed to download and run npm packages from within a node app. And remembering that npx already has all the required logic for that this seemed like the easiest way to do it...

Inspired by [global-npm](https://github.com/dracupid/global-npm)
