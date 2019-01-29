This is a guide for Nulogy employees who wish to contribute to the Design System. 

## Installation 

### Prerequisites 
1. Download and install the latest LTS version of [Node (10.15.0)](https://nodejs.org/en/)
2. Download and install the package manager [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)

### Cloning the repo 
1. In the directory you want to install the design system, run `git clone https://github.com/nulogy/design-system/ && cd design-system`
2. Run `yarn` to install dependencies 

## Adding tokens
From the `/tokens/` directory: 

* Add or update tokens in the `/src/` folder
* Run `yarn build` to use [Style Dictionary](https://amzn.github.io/style-dictionary) to convert those tokens into `_variables.scss` for Sass and `exports.js` for React usage 

New export formats can be added in `config.js`. 

## Writing components 
From the `/components/` directory: 
* `yarn start` will run a storybook at [localhost:8080](localhost:8080) for local development. 
* `yarn build` will rebuild the package exports for production.

## Writing CSS 
Our CSS package provides a way to access our tokens 
From the `/css` directory: 
* `yarn start` will watch `*.scss` files, compile them to `nds-dev.css` and launch a storybook dev environment at [http://localhost:8080](http://localhost:8080) 
* `yarn build` will rebuild nds.css. 

## Coding standards
_Coming soon_

## PR workflow 
_Coming soon_

## Testing

* To run everything:
  * `cd components; yarn test`
* To run just storyshots:
  * `cd components; yarn run storyshots`
* To update storyshot snapshots because they were intended changes:
  * `cd components; yarn run storyshots:update`


## Documentation 
The main documentation can be found at [http://nulogy.design](http://nulogy.design). It's a static site created with [GatsbyJS](https://gatsbyjs.org) managed in `@nulogy/docs`. 
Our component storybook can be found at [https://nulogy.github.io/design-system](https://nulogy.github.io/design-system)

## Publishing documentation 
_Coming soon_ 

## Resources
* [#design-system on Slack](slack://channel?id=CBAFQ4X7X/)



