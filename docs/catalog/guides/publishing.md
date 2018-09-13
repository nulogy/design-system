> Nulogy Design System is made available as a number of packages published to the [npm package repository](https://www.npmjs.com). We use [Lerna](https://lernajs.io) to manage these packages in a [yarn workspaces monorepo](https://yarnpkg.com/lang/en/docs/workspaces/). 
>
> This guide will help you to publish the NDS packages to npm.

### TOC
- [Packages](#packages)
-- [`@nulogy/components`](#nulogycomponents)
-- [`@nulogy/tokens`](#nulogytokens)
-- [`@nulogy/css`](#nulogycss)
- [Publishing to NPM with Lerna](#publishing-to-npm-with-lerna)
[1. Ensure that you are on the master branch and that everything is up to date](#1-ensure-that-you-are-on-the-master-branch-and-that-everything-is-up-to-date)
[2. Check for updated packages](#2-check-for-updated-packages)
[3. Make sure tests are passing](#3-make-sure-tests-are-passing)
[4. Disable GitHub branch protection on the `master` branch -- HACK :( ](#4-disable-github-branch-protection-on-the-master-branch----hack-)
[5. Publish a new version of the packages to npm](#5-publish-a-new-version-of-the-packages-to-npm)
[6. Re-enable branch protection on the `master` branch -- HACK](#6-re-enable-branch-protection-on-the-master-branch----hack)


# Packages

> NDS is made available as several related packages. Here is a list of the available packages:

## `@nulogy/components`

The [React](https://reactjs.org) component library is the primary means of building interfaces with NDS. It is broken down into elements that encode the principles of the Nulogy Design System. 

**This package should be your first choice for building interfaces with NDS.**

- Docs: [http://nulogy.design/components/button](http://nulogy.design/components/)
- npm: [https://www.npmjs.com/package/@nulogy/components](https://www.npmjs.com/package/@nulogy/components)  
- GitHub: [https://github.com/nulogy/design-system/tree/master/components](https://github.com/nulogy/design-system/tree/master/components)

## `@nulogy/tokens`

The tokens package contains the basic values (colours, spacing ...) that form the bases of the Nulogy Design System. These values are made available as a Javascript module.

- Docs: [http://nulogy.design/tokens](http://nulogy.design/tokens)
- npm: [https://www.npmjs.com/package/@nulogy/tokens](https://www.npmjs.com/package/@nulogy/tokens)  
- GitHub: [https://github.com/nulogy/design-system/tree/master/tokens](https://github.com/nulogy/design-system/tree/master/tokens)

```hint
 Rather than use the `@nulogy/tokens` directly in your code, it is encouraged that you look to `@nulogy/components`, where the token values are expressed as interface elements,  first.
```

## `@nulogy/css`

The `nulogy/css` package contains several CSS files for use in NDS projects. These files include a reset and small number global styles, as well as CSS utility classes.

- npm: [https://www.npmjs.com/package/@nulogy/css](https://www.npmjs.com/package/@nulogy/css)  
- GitHub: [https://github.com/nulogy/design-system/tree/master/css](https://github.com/nulogy/design-system/tree/master/css)

```hint|neutral
The CSS utility classes are meant as a fallback for legacy applications that can not use the React components in `@nulogy/components`. Please make an effort to use the React components first.
```

# Publishing to NPM with Lerna

> NDS uses [Lerna](https://lernajs.io) to manage versioning and publishing packages in the monorepo, and [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to manage dependencies.

```hint
New versions of NDS can only be published by administrators of the GitHub project.
```

```hint|warning
This process is under development and definitely involves some hacky steps. Proceed with caution.
```
## 1. Ensure that you are on the `master` branch and that everything is up to date.

```code
$ git checkout master
$ git pull --rebase
```
## 2. Check for updated packages

```code
lang: shell
---
$ lerna updated
```

This will print out a list of any packages that have changed since the last published version. If nothing has been updated then there is no need to continue.

## 3. Make sure tests are passing

```code
$ yarn test
```

Do not proceed if tests are failing!

## 4. Disable GitHub branch protection on the `master` branch -- HACK :( 

Branch protection is enabled on the `master` branch in GitHub so that all changes must be merged into master via a pull request. However, publishing to npm

```hint|warning
This is the hacky bit right here ;)
```

You will need to allow administartors to ignore the branch protection:

1. [Go to the `master` branch protection settings page on GitHub](https://github.com/nulogy/design-system/settings/branch_protection_rules/2078646)
1. Scroll down to find the **"Include administrators"** checkbox.
1. Uncheck the **"Include administrators"** checkbox.
1. Hit **"Save changes"** at the bottom of the page (you will need to enter your gitHub password).

Now project administrators are excluded from the branch protections on `master` and can push freely to that branch.

## 5. Publish a new version of the packages to npm

```code
$ lerna publish
```

This command will drop you into a wizard that will ask you to choose a new version (patch, minor, major ...). It will then do a fresh install and build of the packages, before publishing any changed packages to npm.

For more on what Lerna publish does see the [Lerna docs for @lerna/publish](https://github.com/lerna/lerna/tree/master/commands/publish).

## 6. Re-enable branch protection on the `master` branch -- HACK

Don't forget to re-enable branch protection to prevent accidental pushes to `master`:

1. [Go to the `master` branch protection settings page on GitHub](https://github.com/nulogy/design-system/settings/branch_protection_rules/2078646)
1. Scroll down to find the **"Include administrators"** checkbox.
1. Check the **"Include administrators"** checkbox.
1. Hit **"Save changes"** at the bottom of the page (you will need to enter your gitHub password).