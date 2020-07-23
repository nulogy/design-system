---
path: "/guides/reading-list"
title: "Reading List"
intro: "A list of books and articles that have been helpful to the Design Ops team at Nulogy as we design and build Nulogy Design System."
---

## Component Design / React

### [Atomic Design — Brad Frost](http://bradfrost.com/blog/post/atomic-web-design/)

Brad Frost's biology metaphor is a bit strained, but his categorization of UI elements into nested buckets of reusability is pivotal to the way we think about component-based UI architecture.

### [Defining Component APIs in React — Brent Jackson](http://jxnblk.com/writing/posts/defining-component-apis-in-react/#defining-component-apis-in-react)

Pragmatic guide to designing design system components that are robust, composable and easy to understand. Focuses on keeping things simple and minimal even when that leads to more obvious, less graceful code. The section [Keep props APIs parallel](http://jxnblk.com/writing/posts/defining-component-apis-in-react/#keep-props-apis-parallel) Succinctly explians the value of [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle) in component libraries.

### [Introducing the Single Element Pattern — Diego Haz](https://medium.freecodecamp.org/introducing-the-single-element-pattern-dfbd2c295c5d)

Five simple rules for building robust and scalable atomic design system components. Add these to Brent Jackson's and you have the core of our component design principles.

### [Pure UI — Guillermo Rauch](https://rauchg.com/2015/pure-ui)

Makes a strong link between the way that designers have typically approached the design of interfaces and the way that React pure functional UI components address state as a series of pure render "frames". This article helped me understand why the pure functional component model is such a good representation of UI.

## Icons

### [On Icons — Oliver Reichenstein](https://ia.net/topics/on-icons)

\_"An icon is a symbol equally incomprehensible in all human languages."
