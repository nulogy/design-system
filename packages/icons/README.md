# @nulogy/icons

> This is a collection of Material Icons that are used by Nulogy applications. This package is already imported into the `<Icon />` component of the [@nulogy/components](https://github.com/nulogy/design-system/tree/master/components), and the icons here can be chosen with the `icon` prop.

![npm (scoped)](https://img.shields.io/npm/v/@nulogy/css.svg)

## 📦 Installation

If you don't have access to the React component, you can install these directly:

`$ yarn add @nulogy/icons`

They can then be used in your application like any other `.svg`.

## ➕ Adding a new icon

We use a subset of "Outlined" Material icons at Nulogy. To find and add a new one:

1. Search [Material Icons](https://material.io/resources/icons/) for the icon you need
2. Clone this repo (`git clone https://github.com/nulogy/design-system.git`)
3. Download svg and rename to desired icon name (in camelCase)
4. Place svg in `/icons/assets/` folder
5. In the `/icons` directory, run `yarn icons` to make the icon available to use
6. In the `/components` directory run `yarn`
7. Run `yarn start` and verify the icon was added correctly at [http://localhost:8080/?path=/story/components-icon--icon](http://localhost:8080/?path=/story/components-icon--icon)
8. After verifying the icon is there, update storyshots with `yarn storyshots:update`
9. Submit PR

## 💬 Questions

- [#design-system](slack://channel?team=T024N2KKA&id=CBAFQ4X7X)
