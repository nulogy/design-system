# Testing

## Component API Testing

All parts of the component API should be tested. If the prop only results in a visual change it may be covered with visual tests only. If there are functional differences make sure to test capture these in written tests.

### Visual Testing

Visual snapshots are taken of each story. Include as many visual variations of the component in stories.
Some stories may be useful for testing, but aren't useful as component documentation, for example a component with exceptionally long text. Stoires just for testing can be added to the VisualTests folder.

### Unit tests

Event handlers should be tested with React Testing Library and Jest within the component folder. Check that the function is called when an event is triggered and called with the correct arguments. This helps us maintain the behaviour developers expect when using our components.

Any complex logic the component relies on should also be unit tested. The logic can be separeted from the component into a function so that it can be easily tested with number of different arguments.

### E2E tests

For any components that are not simply presentational and have user interactions built into them, e2e testing should be done in a real browser with Cypress and storybook to simulate the end user (not developer) interacting with the component.

## Selector Priority

There are lots of ways to interact with an element in the dom, but not all are as resilient to change as others. We try to write our selectors in a way that resembles how a user interacts with components or pages. Our users don’t care about the class names we use, so neither should our tests.

In light of this, we try to use selectors based on the following priority, as recommended by [react-testing-library](https://testing-library.com/docs/guide-which-query):

- Label
- Placeholder
- Text contents
- Alt text
- Title
- Display value
- Role
- Test ID

And we avoid using:

- Class names
- IDs
- Most HTML tags

Test IDs are added when other options are hard to use.
Test IDs should be maintained while refactoring to avoid breaking changes that could cause tests to fail in consuming applications.

## Utilities Testing

All .util files should have a corresponding Jest .spec file that tests a variety of arguments with each utility function.
