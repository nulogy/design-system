> This document will help you build and run Nulogy Design System for local development on your machine. 

These docs are part of the larger [@nulogy/design-system](https://github.com/nulogy/design-system) project. This project uses [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to manage multiple packages in one repository.

You will need to clone the repo to your machine, install necessary dependencies and run the development server. we'll cover all these steps below.


# Clone the repo to your local machine

The repo is located at [https://github.com/nulogy/design-system](https://github.com/nulogy/design-system). 

You can clone the repo from the command line like so:

```code
lang: sh
---
$ cd ~/src/nulogy # or wherever you want to work
$ git clone https://github.com/nulogy/design-system.git design-system
$ cd design-system
```

# Installation

You will need to install NVM, Node, Direnv, and Yarn.

## NVM

[NVM is the Node Version Manager](https://github.com/creationix/nvm). It allows you to install and switch between multiple versions of Node.

### Make sure your shell profile is setup

It seems that some Macs don't have a `~/.profile` set by default. You will need a shell profile set. 

Before installing NVM you will need to check if you have a shell profile: look for one of the following files: `~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc`.

If you don't have any of these, add one:

```code
lang:sh
---
$ touch ~/.profile
```
### Install NVM

[Follow the instructions on the NVM repo](https://github.com/creationix/nvm#installation).

## Node

Now that you have NVM installed, ensure that you have the correct version of node. 

Note that at the time of writing the correct version of node for NDS is `v8.11.3`, however you can check the version in the project's [`.nvmrc`](https://github.com/nulogy/design-system/blob/master/.nvmrc)

```code
lang:sh
---
$ nvm install node 8.11.3
```

## Direnv (optional)

[Direnv](https://github.com/direnv/direnv) is a utility that will automatically set your environment to use the correct version of node.

Direnv can be installed from homebrew:

```code
lang:sh
---
$ brew install direnv
```

You will need to hook it into your shell. 

For bash add the following to your `/.bash_profile`:

```code
lang:sh
---
eval "$(direnv hook bash)"
```

For zsh add the following to your `/.zshrc`:

```code
lang:sh
---
eval "$(direnv hook zsh)"
```

[Check out the docs](https://github.com/direnv/direnv#setup) for installation on other shells.

## Yarn

Nulogy Design System uses the [Yarn package](https://yarnpkg.com/) manager to manage [npm](https://www.npmjs.com/) dependencies. 

You can check if you have yarn installed by typing `yarn -v` in the terminal: 


```code
lang: sh
---
$ yarn -v
1.7.0 
```

If you see a version number like this you're good 👍

However, If you see this... 

```code
lang: sh
---
$ yarn -v
bash: command not found: yarn 
```

 ... then you'll need to install yarn by following the instructions for your platform on the yarn website: [https://yarnpkg.com/lang/en/docs/install](https://yarnpkg.com/lang/en/docs/install)

## Install dependencies and link local packages

The project uses Yarn Workspaces to allow you to install dependencies for all packages in the monorepo in one command.

From the repo root, type:

```code
lang: sh
---
$ yarn install
```

That's it! Yarn should pull down and install all project dependencies. Yarn will also create symlinks for dependencies across packages within the repo. Local changes across packages will instantly be reflected everywhere in the project without the need to publish and install new versions.

# Run the development server

To start a dev server that live-reloads your changes in the browser, run the following command from the repo root:

```code
lang: sh
---
$ yarn start
```

This will start the [Storybook](https://storybook.js.org) for the [@nulogy/components](https://www.npmjs.com/package/@nulogy/components) project.

# Package Scripts

For information about other scripts available to you see the [Package Scripts guide](guides/scripts).




