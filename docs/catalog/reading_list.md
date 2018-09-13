> Here's a list of books and articles that were helpful to the Design Ops team at Nulogy as we were designing and building Nulogy Design System.

### TOC
- [Component Design / React](#component-design--react)
- [CSS](#css)
- [Layout](#layout)
- [Maintenance](#maintenance)
- [Type](#type)

# Component Design / React

## [Defining Component APIs in React by Brent Jackson](http://jxnblk.com/writing/posts/defining-component-apis-in-react/#defining-component-apis-in-react)

Pragmatic guide to designing design system components that are robust, composable and easy to understand. Focuses on keeping things simple and minimal even when that leads to more obvious, less graceful code. The section [Keep props APIs parallel](http://jxnblk.com/writing/posts/defining-component-apis-in-react/#keep-props-apis-parallel) Succinctly explians the value of [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle) in component libraries.

## [Pure UI by Guillermo Rauch](https://rauchg.com/2015/pure-ui)

Makes a strong link between the way that designers have typically approached the design of interfaces  and the way that React pure functional UI components address state as a series of pure render "frames". This article helped me understand why the pure functional component model is such a good representation of UI.


# CSS

## [CSS Architecture for Design Systems by Brad Frost](http://bradfrost.com/blog/post/css-architecture-for-design-systems/)

Great advice about how to keep your CSS scalable and maintainable, even though some of the ideas (BEM) don't apply in our component-based CSS architecture.

I particularly like the rules around what Sass nesting is allowed: in our context that would translate to: only media queries, parent selectors, and states (as BEM modifiers aren't needed).

## [CSS Modules; Welcome to the Future by Glen Maddern](https://glenmaddern.com/articles/css-modules)

This article completely blew me away and changed everything I believed in about CSS.

# Layout

## [Learning from Lego: A Step Forward in Modular Web Design by Samantha Zhang](https://alistapart.com/article/learning-from-lego-a-step-forward-in-modular-web-design)

When you are designing components that can be arbitrarily nested, it's hard to develop a strategy for applying whitespace that works. This is one solid strategy.

# Maintenance

## [Versioning & Breaking Changes from Morningstar Design System](http://designsystem.morningstar.com/about/versioning.html)

Guidelines for how to use [semver](https://semver.org) in a design system context. Takes into account _API changes_ as well as _visual changes_; and what is considered a "breaking visual change".

# Type

## [Deep dive CSS: font metrics, line-height and vertical-align by Vincent De Oliveira](http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align)

Sigh. What a mess.
