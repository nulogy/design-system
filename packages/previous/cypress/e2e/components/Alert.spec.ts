describe("Alert", () => {
  beforeEach(() => {
    cy.renderFromStorybook("alert--with-a-close-button");
  });

  it("shows an alert", () => {
    cy.get('[role="alert"]').should("be.visible");
    cy.isInViewport('[role="alert"]');
  });

  it("hides the alert when closed", () => {
    cy.get('[aria-label="Close"]').click();
    cy.get('[role="alert"]').should("not.exist");
    cy.get('[role="alert"]').should("not.exist");
  });
});
