# What is this project for?

This is a separate project to hold end-to-end tests for the design system.

# What should I know?

What's special about this project is that it adds a new command to cypress, which allows you to mount React components directly into the test browser.

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

# Credits

Implementation: https://github.com/D1no/coinglaze/commit/677bcda02074e63d57155578e5ac466820e6d742
Original inspiration: https://github.com/bahmutov/cypress-react-unit-test