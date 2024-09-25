describe("ToastContainer", () => {
  const getToastTypeSelect = () => cy.get("[data-testid='label-text']").contains("Type");
  const getToastBehaviorSelect = () => cy.get("[data-testid='label-text']").contains("Behavior");
  const getToastDurationInput = () => cy.get("[data-testid='label-text']").contains("Show duration in milliseconds");
  const getToastMaximumVisibleInput = () =>
    cy.get("[data-testid='label-text']").contains("Maximum number of visible toasts");

  const closeBtn = () => cy.get('[role="alert"] [aria-label="Close"]');
  const toast = () => cy.get('[role="alert"]');
  const button = () => cy.get("button").contains("Trigger toast");

  beforeEach(() => {
    cy.renderFromStorybook("toastcontainer--with-everything");
  });

  it("should trigger a toast", () => {
    button().click();

    toast().should("exist");
  });

  it("should trigger a toast of the right type", () => {
    getToastTypeSelect().click();

    cy.focused().type("danger {enter}");

    button().click();
    toast().should("contain", "danger");
  });

  it("should pass the isClosable prop to the Alert component", () => {
    getToastBehaviorSelect().click();

    cy.focused().type("dismissible {enter}");
    button().click();

    closeBtn().click();
    toast().should("not.exist");
  });

  it("allow changing the container duration", () => {
    getToastBehaviorSelect().click();
    cy.focused().type("auto {enter}");

    getToastDurationInput().click();
    cy.focused().clear();
    cy.focused().type("500");

    button().click();

    toast().should("not.exist");
  });

  it("allow changing the maximum number of visible toasts", () => {
    getToastBehaviorSelect().click();
    cy.focused().type("dismissible {enter}");

    getToastMaximumVisibleInput().click();
    cy.focused().clear();
    cy.focused().type("1");

    button().click();
    button().click();
    button().click();
    button().click();

    const expectedNumberOfToasts = 1;
    toast().should("have.length", expectedNumberOfToasts * 2); // because cypress sees double the amount of actually visible toasts
  });
});
