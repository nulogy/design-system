# @nulogy/tokens

> This is where Nulogy's design tokens are stored and converted using [Style Dictionar](https://amzn.github.io/style-dictionary)

![npm (scoped)](https://img.shields.io/npm/v/@nulogy/tokens.svg)

## What are tokens?

> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.

- [Salesforce](https://www.lightningdesignsystem.com/design-tokens/)

## 📦 Installation

**⚠️ Note** that this package is primarily designed to be used by [@nulogy/components](https://github.com/nulogy/design-system/tree/master/components) and [@nulogy/css](https://github.com/nulogy/design-system/tree/master/css). You probably shouldn't be pulling this into an application, unless you need access to raw sass, css, or javascript values for some reason.

`yarn add @nulogy/tokens`

## ✨ Usage

After installing, you'll have access to three variable files:

- `_variables.scss` for sass variables, used by @nulogy/css
- `_exports.js` for javascript constants, used by @nulogy/components and converted into [theme](asdasd) file
- `variables.css` for access to css variables

## 💬 Questions

- [#design-system on Slack](slack://channel?id=CBAFQ4X7X/)
