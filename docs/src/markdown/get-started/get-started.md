---
path: "/guides/get-started"
title: "Get started"
intro: "Learn how to start designing and developing using the Nulogy Design System"
---

![Nulogy logos](logos.png)

# Developers
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

<div style="margin-bottom: 64px;"></div>

# Designers

Nulogy uses Sketch as our primary design tool. There are a few things you can do to start working with the Nulogy Design System in Sketch.

### [Download Sketch UI Kit](https://share.goabstract.com/73221fd2-6626-43c8-b95c-e4bec74741ab)
The Sketch Library is a collection of colour palettes, type styles and components. Start each project with this file to ensure you’re able to use the Nulogy Design System to its fullest.

[![Download UI Kit](UI-kit.png)](https://share.goabstract.com/73221fd2-6626-43c8-b95c-e4bec74741ab)

### Update Nudging Settings
Our spacing system uses an 8px unit of measurement, so it’s helpful to have nudging settings that match. These can be found in `Preferences > Nudging Settings`

![Sketch nudging settings screenshot](sketch-nudging.png)

<div style="margin-bottom: 64px;"></div>

# Contributing
There’s no official process for contributing to the design system yet. If you notice something is missing, please post in the [#design-system](slack://channel?id=CBAFQ4X7X/) slack channel and we’ll add it to the roadmap.



