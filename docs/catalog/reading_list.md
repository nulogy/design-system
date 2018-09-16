> Here's a list of books and articles that were helpful to the Design Ops team at Nulogy as we were designing and building Nulogy Design System.

### TOC
- [Component Design / React](#component-design--react)
- [CSS](#css)
- [Icons](#icons)
- [Layout](#layout)
- [Maintenance and practices](#maintenance-and-practices)
- [Theory](#theory)
- [Type](#type)

# Component Design / React

## [Atomic Design by Brad Frost](http://bradfrost.com/blog/post/atomic-web-design/)

Brad Frost's biology metaphor is a bit strained, but his categorization of UI elements into nested buckets of reusability is pivotal to the way we think about component-based UI architecture.


## [Defining Component APIs in React by Brent Jackson](http://jxnblk.com/writing/posts/defining-component-apis-in-react/#defining-component-apis-in-react)

Pragmatic guide to designing design system components that are robust, composable and easy to understand. Focuses on keeping things simple and minimal even when that leads to more obvious, less graceful code. The section [Keep props APIs parallel](http://jxnblk.com/writing/posts/defining-component-apis-in-react/#keep-props-apis-parallel) Succinctly explians the value of [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle) in component libraries.


## [Introducing the Single Element Pattern by Diego Haz](https://medium.freecodecamp.org/introducing-the-single-element-pattern-dfbd2c295c5d)

Five simple rules for building robust and scalable atomic design system components. Add these to Brent Jackson's and you have the core of our component design principles.


## [Pure UI by Guillermo Rauch](https://rauchg.com/2015/pure-ui)

Makes a strong link between the way that designers have typically approached the design of interfaces  and the way that React pure functional UI components address state as a series of pure render "frames". This article helped me understand why the pure functional component model is such a good representation of UI.



# CSS

## [CSS Architecture for Design Systems by Brad Frost](http://bradfrost.com/blog/post/css-architecture-for-design-systems/)

Great advice about how to keep your CSS scalable and maintainable, even though some of the ideas (BEM) don't apply in our component-based CSS architecture.

I particularly like the rules around what Sass nesting is allowed: in our context that would translate to: only media queries, parent selectors, and states (as BEM modifiers aren't needed).


## [CSS Modules; Welcome to the Future by Glen Maddern](https://glenmaddern.com/articles/css-modules)

This article completely blew me away and changed everything I believed in about CSS.


## [A Unified Styling Language by Mark Dalgleish](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)

A cogent argument for the value of component-based-CSS and the power of writing CSS in Javascript.



# Icons 

## [Align SVG Icons to Text and Say Goodbye to Font Icons by Elliot Dahl](https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4)

This influenced the approach we use in our own [Icon component](https://nulogy.design/components/icons).


## [On Icons by Oliver Reichenstein](https://ia.net/topics/on-icons)

_"An icon is a symbol equally incomprehensible in all human languages."_ Lovely illustrations.



# Layout

## [Learning from Lego: A Step Forward in Modular Web Design by Samantha Zhang](https://alistapart.com/article/learning-from-lego-a-step-forward-in-modular-web-design)

When you are designing components that can be arbitrarily nested, it's hard to develop a strategy for applying whitespace that works. This is one solid strategy.


## [Space in Design Systems by Nathan Curtis](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)

_"Space epitomizes the “I design this way, you build that way” gap between design and dev."_

Inset, squish, stretch, stack, inline, and grid: Nathan Curtis gives us the tools and language to develop a systematic approach to spacing that bridges the gap between design and dev. 



# Maintenance and practices

## [Storybook Driven Development by Ned Schwartz](https://medium.com/nulogy/storybook-driven-development-a3c517276c07)

This is how we do visual TDD of our components at Nulogy.


## [Versioning & Breaking Changes from Morningstar Design System](http://designsystem.morningstar.com/about/versioning.html)

Guidelines for how to use [semver](https://semver.org) in a design system context. Takes into account _API changes_ as well as _visual changes_; and what is considered a "breaking visual change".



# Theory

## [The Design Tool Dilemma by Colm Tuite](https://medium.freecodecamp.org/the-design-tool-dilemma-225541c4ad1d)

Where does digital product design live? In images of the product drawn in design tools? Or in code? 



# Type

## [Cropping Away Negative Impacts of Line Height by Kevin Powell](https://medium.com/eightshapes-llc/cropping-away-negative-impacts-of-line-height-84d744e016ce)

One weird trick to win the struggle against whitespace issues. We do this in our [Type components](https://nulogy.design/components/type).


## [Deep dive CSS: font metrics, line-height and vertical-align by Vincent De Oliveira](http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align)

Sigh. What a mess.
