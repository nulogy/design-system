# What is this project for?

This is a separate project to hold end-to-end tests for the design system.

# What should I know?

What's special about this project is that it adds a new command (`cy.renderFromStorybook`) to cypress, which allows you to render a component from NDS's component project.

e.g.

```js
it("renders a react component", () => {
  cy.renderFromStorybook("select--base");
});
```

# Why is this useful?

cypress works by running against an existing server. Unlike application development, NDS doesn't have an app server to run. The second best thing it has is a storybook. The components-e2e project has tasks that will build/start storybook before running cypress tests.

Stories within any component folder can be tested and additional stories just for testing purposes can be found in `components/src/StoriesForTests`.

# How do I run e2e specs?

To test in the cypress runner (to see the tests run):

- `pnpm cypress:open`
  - Then run whichever file you want.

CLI:

- `pnpm e2e:test`

IN BROWSER:

- `pnpm e2e:start`
