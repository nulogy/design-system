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

// cypress-enter-plugin: fills in missing functionality in cypress so that enter can be used as click
// The plugin overrides the type command and manually triggers a click

import "cypress-enter-plugin";
import "cypress-real-events";

Cypress.Commands.add("renderFromStorybook", (component, props) => {
  const baseUrl = `/iframe.html?path=/story/components-${component}`;

  if (props) {
    const encodedProps = encodeURIComponent(JSON.stringify(props));
    cy.visit(`${baseUrl}&args=${encodedProps}`);
  } else {
    cy.visit(baseUrl);
  }
});

Cypress.Commands.add("assertTooltip", (triggerSelector, expectedText) => {
  cy.get(triggerSelector).realHover();
  cy.get(triggerSelector)
    .should("have.attr", "aria-describedby")
    .then((tooltipId) => {
      cy.get(`#${tooltipId}`)
        .should("exist")
        .should("have.css", "visibility", "visible")
        .and("have.css", "opacity", "1")
        .contains(expectedText);
    });
});

Cypress.Commands.add("assertNoTooltip", (triggerSelector) => {
  cy.get(triggerSelector).should("not.have.attr", "aria-describedby");
});

Cypress.Commands.add("pressEscapeKey", () => {
  cy.get("body").type("{esc}");
});

Cypress.Commands.add("clickOutsideElement", () => {
  cy.get("body").click();
});

/* VIEWPORT CHECKS: useful for checking if an element is in view, particularly useful since the "visible" check built into cypress checks the visibility according to the css propterty and will not catch elements that are visually moved off the screen but remain css visible for screenreaders or other purposes */

Cypress.Commands.add("isInViewport", (element) => {
  cy.get(element).then(($el) => {
    // @ts-ignore
    const bottom = Cypress.$(cy.state("window")).height();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(bottom);
  });
});
Cypress.Commands.add("isNotInViewport", (element) => {
  cy.get(element).then(($el) => {
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.lessThan(0 - rect.height);
  });
});

Cypress.Commands.add("paste", ({ destinationSelector, pastePayload }) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  cy.get(destinationSelector).then((destination) => {
    const pasteEvent = Object.assign(new Event("paste", { bubbles: true, cancelable: true }), {
      clipboardData: {
        getData: (type = "text/plain") => pastePayload,
      },
    });
    destination[0].dispatchEvent(pasteEvent);
  });
});
