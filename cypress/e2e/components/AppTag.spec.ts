describe("AppTag ", () => {
  it("inside a modal", () => {
    cy.renderFromStorybook("apptag-usecases--inside-a-modal");

    cy.get('[role="dialog"]').should("be.visible");

    cy.contains("Modal Title").should("be.visible");

    cy.contains(
      "The point of this test is to see if the tooltip is visible and shown over the modal and its overlay"
    ).should("be.visible");

    cy.contains("DQI").should("be.visible");

    cy.contains("DQI").realHover();

    cy.get('[role="tooltip"]').should("be.visible").and("contain", "Digital Quality Inspection");
  });
});
