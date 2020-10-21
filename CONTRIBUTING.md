This is a guide for Nulogy employees who wish to contribute to the Design System.

## Installation

### Prerequisites

1. Download and install the latest LTS version of [Node (12.16.3)](https://nodejs.org/en/)
2. Download and install the package manager [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)

### Cloning the repo

1. In the directory you want to install the design system, run `git clone https://github.com/nulogy/design-system/ && cd design-system`
2. Run `yarn` to install dependencies
3. Run `yarn build` to build the components for the first time

## Writing components

- `yarn start` will run a storybook at [localhost:8080](localhost:8080) for local development.
- `yarn build` will rebuild the package exports for production.

To generate the files needed for a new component, you can use [Plop](https://plopjs.com/)

- Run `yarn new ComponentName` (make sure your name is in PascalCase)

## Coding standards

_Coming soon_

## Pull requests

1. If you don't already have access to the [Design System Collaborators](https://github.com/orgs/nulogy/teams/design-system-collaborators/members) team on Github, request access in [#design-system](https://slack.com/app_redirect?channel=design-system)
2. Clone https://github.com/nulogy/design-system
3. Do work on a branch and submit a PR describing the changes you've made and why you've made them
4. Post a link to the PR in #design-system
5. Somebody from design ops will take a look and be in touch

Note: NDS follows the [Conventional Commits](https://www.conventionalcommits.org) specification. PRs with only one commit should have the appropriate prefix (ex. 'fix:'). PRs with multiple commits should have the prefix in the PR title.

## Testing

- To run everything:
  - `yarn test`

## Documentation

The main documentation can be found at [http://nulogy.design](http://nulogy.design). It's a static site created with [GatsbyJS](https://gatsbyjs.org) managed in `@nulogy/docs`.
Our component storybook can be found at [https://nulogy.github.io/design-system](https://nulogy.github.io/design-system)

## Publishing documentation

_Coming soon_

## Resources

- [#design-system](slack://channel?team=T024N2KKA&id=CBAFQ4X7X)
