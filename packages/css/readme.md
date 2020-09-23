# @nulogy/css

> A way to use the Nulogy Design System without having access to our React components.

![npm (scoped)](https://img.shields.io/npm/v/@nulogy/css.svg)

## 📦 Installation

1. Install the package: `yarn add @nulogy/css`
2. Include the CSS where you need it: `<link rel="stylesheet" href="/node_modules/@nulogy/css/dist/nds.css" />`

Note that the path will be different for your application.

## ✨ Usage

There are two different types of CSS classes available: components and utility classes.

### Components

These are CSS classes to match the React components on [nulogy.design](http://nulogy.design). For example, to create an [Alert](https://nulogy.design/components/alert), we could write:

```
<div class="Alert">
   <div class="Alert__content">
     <p class="Alert__title">Important information</p>
     <p class="Alert__message">Details about important information</p>
   </div>
 </div>
```

Not all components are replicated. View the `/src/components` directory to see what's available.

For components, we use the [BEM](http://getbem.com/naming/) naming convention whenever possible.

### Utility classes

Utility classes do one thing and they do it very well. You can use these classes to apply Nulogy's theme to any element on your page.

For example, to make text _Nulogy blue_, we could use `.nds-text--blue`.

Utility classes are prefixed with `.nds-`.

#### Responsive

All utilitity classes are available responsively by adding a breakpoint prefix to the beginning of the class, e.g:

```
.nds-font-size--large (for any screen size)
.nds@sm-font-size--large (768px and up)
.nds@md-font-size--large (1024px and up)
.nds@lg-font-size--large (1360px and up)
.nds@xl-font-size--large (1920px and up)
```

## 📚 Documentation

We don't actually host the CSS storybook anywhere at the moment. To see the full list of available classes and components along with usage examples:

```
$ git clone https://github.com/nulogy/design-system.git
$ cd design-system/packages/css
$ yarn
$ yarn start
```

This will open a storybook at [http://localhost:9000](http://localhost:9000).

## 💬 Questions

- [#design-system](slack://channel?team=T024N2KKA&id=CBAFQ4X7X)
