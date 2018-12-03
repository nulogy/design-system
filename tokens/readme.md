# @nulogy/tokens
This is where Nulogy's design tokens are stored and converted using [Style Dictionary](https://amzn.github.io/style-dictionary)

## What are tokens?
> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.
- [Salesforce](https://www.lightningdesignsystem.com/design-tokens/)

## Usage
1. Add or update tokens in the `/src/` folder
2. Run `yarn build` to convert those tokens into `_variables.scss` for Sass and `exports.js` for React usage

Your application can them import and use whichever format is required.

New export formats can be added in `config.js`. 

