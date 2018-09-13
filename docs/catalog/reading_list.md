> Here's a list of books and articles that were helpful to the Design Ops team at Nulogy as we were designing and building Nulogy Design System.

### TOC
- [Component Design / React](#component-design--react)
- [CSS](#CSS)

# Component Design / React

## [Defining Component APIs in React by Brent Jackson](http://jxnblk.com/writing/posts/defining-component-apis-in-react/#defining-component-apis-in-react)

Pragmatic guide to designing design system components that are robust, composable and easy to understand. Focuses on keeping things simple and minimal even when that leads to more obvious, less graceful code. The section [Keep props APIs parallel](http://jxnblk.com/writing/posts/defining-component-apis-in-react/#keep-props-apis-parallel) Succinctly explians the value of [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle) in component libraries.

# CSS

## [CSS Architecture for Design Systems by Brad Frost](http://bradfrost.com/blog/post/css-architecture-for-design-systems/)

Great advice about how to keep your CSS scalable and maintainable, even though some of the ideas (BEM) don't apply in our component-based CSS architecture.

I particularly like the rules around what Sass nesting is allowed: in our context that would translate to: only media queries, parent selectors, and states (as BEM modifiers aren't needed).

## [CSS Modules; Welcome to the Future by Glen Maddern](https://glenmaddern.com/articles/css-modules)

This article completely blew me away and changed everything I believed in about CSS.
