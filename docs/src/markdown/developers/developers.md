---
path: "/guides/developers"
title: "Developers"
intro: "Learn how to get started using the Nulogy Design System"
---

The Nulogy Design System is a monorepo consisting of four packages. Here you'll find instructions for downloading all the packages.

### Getting Started
1. Download and install the latest LTS version of [Node (10.15.0)](https://nodejs.org/en/)
2. Download and install the package manager [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)
3. In the directory you want to install the design system, run `git clone https://github.com/nulogy/design-system/ && cd design-system`
4. Run `yarn` to install dependencies 

Congratulations, you've installed the design system! Please see the READMEs linked below for usage instructions. 

| Package  | What it does |
| ------------- | ------------- |
| **[@nulogy/tokens](https://github.com/nulogy/design-system/tree/master/tokens)**   | The tokens package is where we store our design options and convert them to javascript and scss variables   |
| **[@nulogy/components](https://github.com/nulogy/design-system/tree/master/components)**  | The components package is where components are developed. We import our design tokens, turn them into a theme file, and then create React components for use in Nulogy applications.
 |
| **[@nulogy/css](https://github.com/nulogy/design-system/tree/master/docs)** | The css package provides sass variables and css classes to apply our visual style to legacy applications that can't import React components. 
 |
| **[@nulogy/docs](https://github.com/nulogy/design-system/tree/master/components)**  | This documentation site, built with Gatsby  |
