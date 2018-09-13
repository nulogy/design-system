> Nulogy Design System is made available as a number of packages published to the [npm package repository](https://www.npmjs.com). 
>
> Here is a list of the available packages, and brief description of what they are used for.

### TOC
- [`@nulogy/components`](#nulogycomponents)
- [`@nulogy/tokens`](#nulogytokens)
- [`@nulogy/css`](#nulogycss)


## `@nulogy/components`

The [React](https://reactjs.org) component library is the primary means of building interfaces with NDS. It is broken down into elements that encode the principles of the Nulogy Design System. 

**This package should be your first choice for building interfaces with NDS.**

- Docs: [http://nulogy.design/components/button](http://nulogy.design/components/)
- npm: [https://www.npmjs.com/package/@nulogy/components](https://www.npmjs.com/package/@nulogy/components)  
- GitHub: [https://github.com/nulogy/design-system/tree/master/components](https://github.com/nulogy/design-system/tree/master/components)

## `@nulogy/tokens`

The tokens package contains the basic values (colours, spacing ...) that form the bases of the Nulogy Design System. These values are made available as a Javascript module.

- Docs: [http://nulogy.design/tokens](http://nulogy.design/tokens)
- npm: [https://www.npmjs.com/package/@nulogy/tokens](https://www.npmjs.com/package/@nulogy/tokens)  
- GitHub: [https://github.com/nulogy/design-system/tree/master/tokens](https://github.com/nulogy/design-system/tree/master/tokens)

```hint
 Rather than use values from `@nulogy/tokens` directly in your code, it is encouraged that you build with `@nulogy/components`, where the token values are expressed as React components.
```

## `@nulogy/css`

The `nulogy/css` package contains several CSS files for use in NDS projects. These files include a reset and small number global styles, as well as CSS utility classes.

- npm: [https://www.npmjs.com/package/@nulogy/css](https://www.npmjs.com/package/@nulogy/css)  
- GitHub: [https://github.com/nulogy/design-system/tree/master/css](https://github.com/nulogy/design-system/tree/master/css)

```hint|neutral
The CSS utility classes are meant as a fallback for legacy applications that can not use the React components in `@nulogy/components`. Please make an effort to use the React components first.
```

