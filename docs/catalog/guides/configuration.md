> Much of the configuration for things like testing, builds, linting etc. is shared across all packages in the monorepo.

1. [`@nulogy/common`](https://github.com/nulogy/design-system/tree/master/common) is a private package that provides a single place to define many of the dev-dependencies.
2. Where possible, configuration files are located in the root of the project.

For more details, see the [`README.md` in the `@nulogy/common` pacakge](https://github.com/nulogy/design-system/blob/master/common/README.md).