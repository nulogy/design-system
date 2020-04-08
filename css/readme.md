![npm (scoped)](https://img.shields.io/npm/v/@nulogy/css.svg?color=blue)

# @nulogy/css

Sass variables and atomic classes for writing CSS using Nulogy design tokens. These variables can be used to create CSS versions of our React components and the atomic classes can be

## Installation

`npm install @nulogy/css --save`

## Usage

1. Include the CSS
   `<link rel="stylesheet" href="/node_modules/@nulogy/tokens/dist/nds.css" />`

2. Use the utility classes as needed in your HTML
   `<p class='nds-text--grey'>Grey text</p>`

If you'd prefer to create your own classes using Scss variables, see [@nulogy/tokens](https://www.npmjs.com/package/@nulogy/tokens).

### Responsive

All utilitity classes are available responsively by adding a breakpoint prefix to the beginning of the class, e.g:

.nds-font-size--large (for any screen size)
.nds@sm-font-size--large (768px and up)
.nds@md-font-size--large (1024px and up)
.nds@lg-font-size--large (1360px and up)
.nds@xl-font-size--large (1920px and up)
