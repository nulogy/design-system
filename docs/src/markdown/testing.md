---
path: "/guides/testing"
title: "Testing"
intro: "A guide to writing automated tests for NDS components. Here you can find information about how we write our own tests for the library and how to use selectors when writing tests for your own application that uses NDS components."
---

## Unit Tests

Unit tests check if small pieces of our code do what they are supposed to do, e.g “When a user clicks a button does that fire the correct onClickHandler?”. They’re located alongside the component file, written using Jest and React-Testing-Library.

[View an example](https://github.com/nulogy/design-system/blob/master/components/src/Select/Select.spec.js) of unit testing our Select component.

## End-to-end Tests

End-to-end tests are how we check our components are behaving correctly e.g: “When a user clicks a button does that open a dropdown menu?” We write these with Cypress in our components-e2e package.

[View an example](https://github.com/nulogy/design-system/blob/master/components-e2e/cypress/integration/components/Select.spec.js) of e2e testing our Select component.

## Selector Priority

There are lots of ways to interact with an element in the dom, but not all are as resilient to change as others. We try to write our selectors in a way that resembles how a user interacts with components or pages. Our users don’t care about the class names we use, so neither should our tests.

In light of this, we try to use selectors based on the following priority, as recommended by react-testing-library:

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
- HTML tags

Test IDs are added when other options are hard to use. If you feel that a useful test id is missing within a NDS component, please let us know.

## Testing Nulogy components in your application

Keeping the priority order in mind, inspect the component in DevTools and look for available selectors to use on the elements you would like to interact with in your tests.

Lets look at the html of the checkbox for example. You can select the whole checkbox component using the label text, the type on the input to access the underlying checked or unchecked state of the checkbox or use the data-testid="visual-checkbox" which represents the checkbox the user actually sees and can click on.

```html
<label class="ClickInputLabel-j2axnv-0 kemUmZ">
  <input
    type="checkbox"
    aria-required="false"
    aria-invalid="false"
    id="checkbox"
    class="Checkbox__CheckboxInput-sc-1nm58f1-1 ejYTGD sc-fzoyTs kaPLDZ"
  />
  <div
    data-testid="visual-checkbox"
    class="Checkbox__VisualCheckbox-sc-1nm58f1-0 kUStCo"
  ></div>
  <p font-size="16px" color="currentColor" class="sc-AxhCb hpmHVQ">
    I am a checkbox
  </p>
</label>
```

Here is an example using Cypress that tests that clicking the checkbox results in a checked checkbox:

```javascript
it("checks the checkbox when the checkbox is clicked", () => {
  cy.get("[data-testid='visual-checkbox']").click();

  cy.get("[type='checkbox']").should("be.checked");
});
```
