This is a guide for Nulogy employees who wish to contribute to the Design System.

## Installation

### Prerequisites

1. Download and install the latest LTS version of [Node (12.16.3)](https://nodejs.org/en/)
2. Download and install the package manager [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)

### Cloning the repo

1. In the directory you want to install the design system, run `git clone https://github.com/nulogy/design-system/ && cd design-system`
2. Run `yarn` to install dependencies
3. Run `yarn build` to build the components for the first time

You should now be ready to work in any package.

## Adding tokens

From the `/tokens/` directory:

- Add or update tokens in the `/src/` folder
- Run `yarn build` to use [Style Dictionary](https://amzn.github.io/style-dictionary) to convert those tokens into `_variables.scss` for Sass and `exports.js` for React usage

New export formats can be added in `config.js`.

## Writing components

From the `/components/` directory:

- `yarn start` will run a storybook at [localhost:8080](localhost:8080) for local development.
- `yarn build` will rebuild the package exports for production.

To generate the files needed for a new component, you can use [Plop](https://plopjs.com/)

- From the `components` directory, run `yarn new ComponentName` (make sure your name is in PascalCase)

## Adding icons

[How to add icons](https://github.com/nulogy/design-system/blob/master/components/icons/README.md)

## Writing CSS

Our CSS package provides a way to access our tokens
From the `/css` directory:

- `yarn start` will watch `*.scss` files, compile them to `nds.css` and launch a storybook dev environment at [http://localhost:8080](http://localhost:8080)
- `yarn build` will rebuild nds.css.

## Coding standards

_Coming soon_

## Pull requests

1. If you don't already have access to the [Design System Collaborators](https://github.com/orgs/nulogy/teams/design-system-collaborators/members) team on Github, request access in [#design-system](https://slack.com/app_redirect?channel=design-system)
2. Clone https://github.com/nulogy/design-system
3. Do work on a branch and submit a PR describing the changes you've made and why you've made them
4. Post a link to the PR in #design-system
5. Somebody from design ops will take a look and be in touch

## Testing

- To run everything:
  - `cd components; yarn test`
- To run just storyshots:
  - `cd components; yarn run storyshots`
- To update storyshot snapshots because they were intended changes:
  - `cd components; yarn run storyshots:update`

## Documentation

The main documentation can be found at [http://nulogy.design](http://nulogy.design). It's a static site created with [GatsbyJS](https://gatsbyjs.org) managed in `@nulogy/docs`.
Our component storybook can be found at [https://nulogy.github.io/design-system](https://nulogy.github.io/design-system)

## Publishing documentation

_Coming soon_

## Resources

- [#design-system](slack://channel?team=T024N2KKA&id=CBAFQ4X7X)
