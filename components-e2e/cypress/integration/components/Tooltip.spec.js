describe("Tooltip", () => {
  it("hides content without interaction", () => {
    cy.renderFromStorybook("storiesfortests-tooltip--base");

    cy.get('[role="tooltip"]').should("not.be.visible");
  });
  it("shows content on hover", () => {
    cy.renderFromStorybook("storiesfortests-tooltip--base");

    cy.get('[aria-haspopup="true"]').trigger("mouseover");
    cy.get('[role="tooltip"]').should("be.visible");
    cy.isInViewport('[role="tooltip"]');
  });
  describe("can be open by default", () => {
    it("shows content initially", () => {
      cy.renderFromStorybook("storiesfortests-tooltip--open-by-default");

      cy.get('[aria-haspopup="true"]').trigger("mouseover");
      cy.get('[role="tooltip"]').should("be.visible");
      cy.isInViewport('[role="tooltip"]');
    });
    it("hides on outside click", () => {
      cy.renderFromStorybook("storiesfortests-tooltip--base");

      cy.clickOutsideElement();
      cy.get('[role="tooltip"]').should("be.visible");
      cy.isNotInViewport('[role="tooltip"]');
    });
    it("hides content on hover", () => {
      cy.renderFromStorybook("storiesfortests-tooltip--open-by-default");
      cy.get('[aria-haspopup="true"]').trigger("mouseover");
      cy.get('[aria-haspopup="true"]').trigger("mouseout");
      cy.wait(2000);
      cy.isNotInViewport('[role="tooltip"]');
    });
  });
});
