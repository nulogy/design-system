/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    isNotInViewport(element: string): Chainable<Element>;
    isInViewport(element: string): Chainable<Element>;
    renderFromStorybook(component: string, props?: Record<string, unknown>): Chainable<Element>;
    pressEscapeKey(): Chainable<Element>;
    clickOutsideElement(): Chainable<Element>;
    tab(): Chainable<Element>;
    paste({
      destinationSelector,
      pastePayload,
    }: {
      destinationSelector: string;
      pastePayload: string;
    }): Chainable<Element>;
  }
}
