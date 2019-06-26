![npm (scoped)](https://img.shields.io/npm/v/@nulogy/tokens.svg?color=blue)

# @nulogy/tokens
This is where Nulogy's design tokens are stored and converted using [Style Dictionary](https://amzn.github.io/style-dictionary). Tokens are mostly used in our React components and CSS classes, but tokens can be imported directly into your application if needed. 

## What are tokens?
> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.
- [Salesforce](https://www.lightningdesignsystem.com/design-tokens/)

## Installation
`yarn add @nulogy/tokens`

## Usage 

### In Sass
`@import '/node_modules/@nulogy/tokens/dist/variables.scss';`

`.blue-thing {color: $color_base_blue}`

### With CSS Modules 

In your component's jsx file, add `import "@nulogy/tokens/dist/variables.css";`

`.blue-thing {color: var(--color-base-blue)}`

### In JS 
If you're using javascript, you can access our theme instead of the tokens directly. For instructions on that, see "For custom components" at [nulogy.design/theme](https://nulogy.design/theme/)
