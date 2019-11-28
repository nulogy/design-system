// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("renderFromStorybook", component => {
  cy.visit(`/iframe.html?path=/story/storiesfortests-${component}`);
});

Cypress.Commands.add("pressEscapeKey", () => {
  cy.get("body").type("{esc}");
});

Cypress.Commands.add("clickOutsideElement", () => {
  cy.get("body").click();
});

/* VIEWPORT CHECKS: useful for checking if an element is in view, particularly useful since the "visible" check built into cypress checks the visibility according to the css propterty and will not catch elements that are visually moved off the screen but remain css visible for screenreaders or other purposes */

Cypress.Commands.add("isInViewport", element => {
  cy.get(element).then($el => {
    const bottom = Cypress.$(cy.state("window")).height();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(bottom);
  });
});
Cypress.Commands.add("isNotInViewport", element => {
  cy.get(element).then($el => {
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.lessThan(0 - rect.height);
  });
});
