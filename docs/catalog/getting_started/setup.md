These docs are part of the larger [@nulogy/design-system](https://github.com/nulogy/design-system) project. This project uses [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to manage multiple packages in one repository.

To work on Nulogy Design System, you will need to clone the repo to your machine, install necessary dependencies and run the development server. This document will guide you through that process.

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

Yarn workspaces allows you to install dependencies for all packages in the monorepo in one command.

From the repo root, type:

```code
lang: sh
---
$ yarn install
```

That's it! Yarn should pull down and install all project dependencies. Yarn will also create symlinks for dependencies across packages within the repo. Local changes across packages will instantly be reflected everywhere in the project without the need to publish and install new versions.

# Run the development server

The [nulogy.design](http://nulgoy.design) website is located in the `@nulogy/nulogy-design` package in the [`\docs`](https://github.com/nulogy/design-system/tree/master/docs) directory. 

You have a few options for how to work in the package. You can work directly in that package folder by `cd`ing to the `/docs` directory. You can also use the `yarn workspace <package name>` command to target commands to a particular package.

## Working in the /doc directory

Working in the `/docs` directory is the simplest way of working on the docs package. 

To run the dev server type the following form the repo root:

```code
lang: sh
---
$ cd docs/
$ yarn start
```

You should see output like the following:

```code
lang: sh
---
yarn run v1.7.0
$ catalog start

  Starting Catalog …



 [DONE]  Compiled successfully in 5690ms    11:47:41

 [I]  Catalog is running at http://localhost:4000/
```

## Working with the `yarn workspace` command

Alternately, you can use the `yarn workspace` command to direct script commands to a particular sub package. 

To run commands on the `@nulogy/nulogy-design` package from anywhere in the project type:

```code
lang: sj
---
$ yarn workspace @nulogy/nulogy-design start
```

You should see output like the following:

```code
lang:sh
---
yarn workspace v1.7.0
yarn run v1.7.0
$ catalog start

  Starting Catalog …



 [DONE]  Compiled successfully in 6331ms    12:06:41

 [I]  Catalog is running at http://localhost:4000/
 ```





