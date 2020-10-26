describe("Alert", () => {
  before(() => {
    cy.visitStorybook();
  });
  beforeEach(() => {
    cy.loadStory("Components/Alert", "With a close button");
  });
  it("shows an alert", () => {
    cy.get('[role="alert"]').should("be.visible");
    cy.isInViewport('[role="alert"]');
  });
  it("hides the alert when closed", () => {
    cy.get('[aria-label="Close"]').click();
    cy.get('[role="alert"]').should("not.be.visible");
    cy.get('[role="alert"]').should("not.exist");
  });
  it("updates text content when knob is changed", () => {
    cy.get('[role="alert"]').should("be.visible");
    cy.get('[role="alert"]').should("have.text", "Warning alert");
    cy.changeKnob("Alert Text", "New text value");
    cy.get('[role="alert"]').should("have.text", "New text value");
    cy.isInViewport('[role="alert"]');
  });
  it("removes the close button when know is unchecked", () => {
    cy.isInViewport('[role="alert"]');
    cy.get('[aria-label="Close"]').should("be.visible");
    cy.changeKnob("isCloseable", false);
    cy.get('[aria-label="Close"]').should("not.be.visible");
  });
});
