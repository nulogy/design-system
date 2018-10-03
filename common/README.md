# `@nulogy/common`

This package contains shared configuration for building, testing, linting and formatting used by all packages in the monorepo.

## Scripts 

If a package uses the default dependencies and configurations from this package, it can simply opt into the dependency's functionality by declaring the appropriate package script from the table below.

For example if you would like to add testing to your package, you can just copy the json snippet from the _"Package Script"_ column of the _"Testing"_ row (`test: "jest --config ../jest.config.js"`), and paste it into the `scripts` block of your `package.json`.

## Configuration

Whenever possible, the configuration files are located in the root of the monorepo (one directory above this one). See the table below for details.

## Dependencies

This package provides the following dependencies:

| Purpose | Package | Package Script | Configuration |
| ------- | ------- | -------------- | ------------- |
| Testing | [Jest](https://jestjs.io) | `"test": "jest --config ../jest.config.js"` | [`/jest.config.js`](/jest.config.js)
| Building | [Webpack](https://webpack.js.org) | `"build": "webpack --mode production --config ../webpack.config.js"` | [`/webpack.config.js`](/webpack.config.js)
| Building (simple)* | [Babel](https://babeljs.io) | `"build": "babel src --out-dir dist` | [`/.babelrc`](/.babelrc)
| Dev server | [Storybook](http://storybook.js.org) | `"start": "start-storybook -p X0X0X0` _(replace `X0X0X0` with a port.)_ | [`/common/storybook`](/common/storybook) _– See note on configuring storybook below_.

* _NOTE: Use the babel build process if you are just transpiling a single file (like `@nulogy/tokens`). For anything more complex, use Webpack for your build._

## Configuring storybook

Storybook configuration is a bit funky and must be declared individually in each package that runs a storybook. However, this package contains files with most of the config boilerplate that you can just import into your package's `.storybook/config`. 

### 1. Create a `.storybook/` config folder

You will need to create a folder called `.storybook/` in your package root. This folder must contain two files: `config.js` and `addons.js`.

Your directory should look like:

```
myPackage/
  .storybook/
    addons.js
    config.js
```

### 2. `.storybook/addons.js`

The `addons.js` files just needs to import the addons config from this package:

```js
import '@nulogy/common/storybook/addons';
```

### 3. `.storybook/config.js`

Your pacakges `config.js` is a bit more involved, and should look like this:

```js
import configureStorybook from '@nulogy/common/storybook/config';
import '@nulogy/css'; // remove this if you don't want the global css

configureStorybook(require.context(
  "../src",       // path where stories live - must be a string literal!
  true,           // recursive?
  /\.story.js$/, // story files match this pattern
));
```

The `config.js` has a call to [Webpack's `require.context`](https://webpack.js.org/guides/dependency-management/#require-context). Due to the way Webpack resolves `require.context`, it can't be dynamic and must be called from inside your package.
