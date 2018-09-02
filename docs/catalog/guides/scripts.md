> This guide documents the scripts available to you in the root [package.json](https://github.com/nulogy/design-system/blob/master/package.json).

# Dev servers

The following scripts start dev servers for various packages.

```hint|neutral
While developing, you may want to run `yarn watch` to build the rest of the project in watch mode. For more see below.
```

```table
rows:
- Script: yarn start
  Task: Component development in the [@nulogy/components](https://github.com/nulogy/design-system/tree/master/components) package
  Result: Runs storybook on [port 9009](http://localhost:9009) for the [@nulogy/components](https://github.com/nulogy/design-system/tree/master/components).

- Script: yarn document
  Task: Write documentation to appear on [nulogy.design](http://nulogy.design).
  Result: Starts [Catalog](https://www.catalog.style/) on [port 4000](http://localhost:4000).  

- Script: yarn hack
  Task: Build a prototype interface to test NDS components.
  Result: Starts the storybook in the [sandbox workspace](https://github.com/nulogy/design-system/tree/master/sandbox) on [port 8008](http://localhost:8008).

- Script: start:all
  Task: __Not recommended__. Run all dev servers for the whole project. Note that you will likely want to run `yarn watch` as well.
  Result: Depending on the project, the dev server will either be Storybook or something else (Catalog dev server for example).

- Script: yarn all
  Task: __Not recommended__. Build the whole project in watch mode and run all dev servers. This can be slow and taxing on your CPU and the terminal output may be hard to read, but offers a quick way to sanity test the project.
  Result: All build (`yarn watch`) and dev servers (`yarn start:all`) will be run concurrently and their output will be streamed together to the console.
```

# Testing

The following scripts are useful for testing

```table
rows:
- Script: yarn test
  Task: Run all tests since master.
  Result: 
    1. Builds all the public npm modules (see **yarn build:public** below)  that have changed since master.

    2. Runs tests in any package with files that have changed since master.
```

# Building

The following scripts are used to build the project.

```table
rows:
- Script: yarn watch
  Task: Useful to run in parallel to a script in the **Dev Servers** section above. Builds all library packages in watch mode. 
  Result: Uses Lerna to run the `watch` command in all workspaces concurrently. See `build:public` below for an explanation of what is considered a "library package".
 
- Script: yarn build
  Task: Build all packages.
  Result: Uses Lerna to build all workspaces.

- Script: yarn build:public
  Task: Build the library packages – not documentation and sandboxes.
  Result: Build only packages where `pkg.private` is not set to `true`.

- Script: yarn clean
  Task: Removes all build artifacts.
  Result: Runs `rm -rf dist` in all workspaces.

- Script: yarn clean:all
  Task: That squeaky-clean fresh install feel.
  Result: Cleans out all build and installation files (`/dist`, `/node_modules` etc.) by running `git clean -fdX .` and removing any files not tracked in git – even those in `.gitignore`.
```

# Working with packages

You have a few options for how to work in the project's sub-package. You can work directly in that package folder by `cd`ing to the package's directory. You can also use the `yarn workspace <package name>` command to target commands to a particular package. Finally there are aliases in the root to all the packages.

## Working in the `/docs` directory


The [nulogy.design](http://nulgoy.design) website is located in the `@nulogy/nulogy-design` package in the [`/docs`](https://github.com/nulogy/design-system/tree/master/docs) directory. 

Working in the `/docs` directory is the simplest way of working on the docs package. 

To run the dev server type the following from the repo root:

```code
lang: sh
---
$ cd docs/
$ yarn start
```

## Working with the `yarn workspace` command

Alternately, you can use the `yarn workspace` command to direct script commands to a particular sub package. 

To run commands on the `@nulogy/nulogy-design` package from anywhere in the project type:

```code
lang: sh
---
$ yarn workspace @nulogy/components storybook
```

## Aliases

There are also aliases in the root `package.json` that make it easier to work with the sub-packages. 

From the repo root you can run:

```code
lang: sh
---
$ yarn docs build
```