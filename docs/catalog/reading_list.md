> Here's a list of books and articles that were helpful to the Design Ops team at Nulogy as we were designing and building Nulogy Design System.

### TOC
- [CSS](#CSS)

# CSS

## [CSS Architecture for Design Systems by Brad Frost](http://bradfrost.com/blog/post/css-architecture-for-design-systems/)

Great advice about how to keep your CSS scalable and maintainable, even though some of the ideas (BEM) don't apply in our component-based CSS architecture.

I particularly like the rules around what Sass nesting is allowed: in our context that would translate to: only media queries, parent selectors, and states (as BEM modifiers aren't needed).

