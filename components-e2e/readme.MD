# What is this project for?

This is a separate project to hold end-to-end tests for the design system.

# What should I know?

What's special about this project is that it adds a new command (`cy.mount`) to cypress, which allows you to mount React components directly into the test browser.

e.g.

```js
import React from "react";

it("renders a react component", () => {
  const TestComponent = () => <div />;

  cy.mount(<TestComponent />);
});
```

# Why is this useful?

It was hard to test behaviours built into the component. e.g. focus, keyboard-traversal, etc.
This allows us to do browser-based unit testing of components.

# How do I run specs?

To test in the cypress runner (to see the tests run):
- `yarn cypress:open`
  - Then run whichever file you want.

CLI:
- `yarn test`

# Are there any quirks I should know about the `cy.mount` command?

Yes.

The command is introduced in: `cypress/support/mountReactCommand.js`

Cypress has 2 iframes.
It runs the spec from one iframe, and renders html into another iframe.

What `cy.mount` does is it first renders html that contains a div named "app" (`div#app`) into the app iframe.
Then it uses `ReactDOM.render` to render the component into `div#app`.

## Quirks

### Quirk #1: The html that `cy.mount` renders pulls React in from a CDN.

This supposedly fixes an issue where events don't trigger properly on subsequent test runs:
https://github.com/bahmutov/cypress-react-unit-test/issues/3

In the future, the version of React may have to be bumped up.

To update:

- Open `mountReactCommand.js`
- Set `reactVersion` to the desired version

### Quirk #2: `cy.mount` is `styled-components`-aware.

In the `mountReactCommand.js` file, you will see that it copies styles from one iframe to another.
Because the component is rendered during the spec run, `styled-components` adds the inline styles inside `<head>` of the
spec iframe. The styles should be in the app iframe's `<head>` for the component to have styles during spec runs.

In the future, if cypress changes the name of the iframe, this code may need to be updated.

# Credits

Implementation: https://github.com/D1no/coinglaze/commit/677bcda02074e63d57155578e5ac466820e6d742

Original inspiration: https://github.com/bahmutov/cypress-react-unit-test