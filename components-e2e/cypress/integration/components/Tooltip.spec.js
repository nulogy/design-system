describe("Tooltip", () => {
  it("hides content without interaction", () => {
    cy.renderFromStorybook("tooltip--base");

    cy.get('[role="tooltip"]').should("not.be.visible");
  });
  it("shows content on hover", () => {
    cy.renderFromStorybook("tooltip--base");

    cy.get('[aria-haspopup="true"]').trigger("mouseover");
    cy.get('[role="tooltip"]').should("be.visible");
  });
});
