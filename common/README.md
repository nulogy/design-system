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


