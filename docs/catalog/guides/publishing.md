> Nulogy Design System uses [Lerna](https://lernajs.io) to manage versioning and publishing packages in the monorepo, and [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to manage dependencies.
>
> This guide will help you to publish the NDS packages to npm.

```hint
NDS can only be published by administrators of the GitHub project.
```

```hint|warning
This process is under development and definitely involves some hacky steps. Proceed with caution.
```

### TOC
[1. Ensure that you are on the master branch and that everything is up to date](#1-ensure-that-you-are-on-the-master-branch-and-that-everything-is-up-to-date)
[2. Check for updated packages](#2-check-for-updated-packages)
[3. Make sure tests are passing](#3-make-sure-tests-are-passing)
[4. Disable GitHub branch protection on the `master` branch -- HACK :( ](#4-disable-github-branch-protection-on-the-master-branch----hack-)
[5. Publish a new version of the packages to npm](#5-publish-a-new-version-of-the-packages-to-npm)
[6. Re-enable branch protection on the `master` branch -- HACK](#6-re-enable-branch-protection-on-the-master-branch----hack)

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