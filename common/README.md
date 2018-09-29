# `@nulogy/common`

This package contains shared configuration for building, testing, linting and formatting used by all packages in the monorepo.

## Scripts 

If a package uses the default dependencies and configurations from this package, it can simply opt into the dependency's functionality by declaring the appropriate package script from the table below.

For example if you would like to add testing to your package, you can just copy the json snippet from the _"Package Script"_ column of the _"Testing"_ row (`test: "jest --config ../jest.config.js --rootDir ./"`), and paste it into the `scripts` block of your `package.json`.

## Configuration

Whenever possible, the configuration files are located in the root of the monorepo (one directory above this one). See the table below for details.

## Dependencies

This package provides the following dependencies:

| Purpose | Package | Package Script | Configuration |
| ------- | ------- | -------------- | ------------- |
| Testing | [Jest](https://jestjs.io) | `"test": "jest --config ../jest.config.js --rootDir ./"` | [`/jest.config.js`](/jest.config.js)
| Building | [Babel](https://babeljs.io) | `"build": "babel src --out-dir dist --ignore *.test*"` | [`/.babelrc`](/.babelrc)
| Building | [Webpack](https://webpack.js.org) | `"build": "webpack --mode production --config ../webpack.config.js"` | [`/webpack.config.js`](/webpack.config.js)
| Dev server | [Storybook](http://storybook.js.org) | `"start": "start-storybook -p X0X0X0` (replace `X0X0X0` with a port.) | [`/common/storybook`](/common/storybook) - See note on configuring storybook below.

## Configuring storybook

Storybook configuration is a bit funky and must be declared individually in each package that runs a storybook. However, this package contains files with most of the config boilerplate that you can just import into your package's `.storybook/config`. 

You will need to create a folder called `.storybook/` in your package root. This folder must contain two files: `config.js` and `addons.js`.

Your directory should look like:

```
myPackage/
  .storybook/
    addons.js
    config.js
```

The `config.js` and `addons.js` files can mostly get away with just importing their contents from this package:

### `.storybook/config.js`

```js
import configureStorybook from '@nulogy/common/storybook/config';
import '@nulogy/css'; // remove this if you don't want the global css

// this call to require.context must happen inside your package and is the main 
// reason the storybook config can't be centralized.
configureStorybook(require.context(
  "../src",       // path where stories live - must be a string literal!
  true,           // recursive?
  /\.story.js$/, // story files match this pattern
));
```

### `.storybook/addons.js`

```js
import '@nulogy/common/storybook/addons';
```