describe("Tooltip", () => {
  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tooltip--tooltip");
    });
    it("hides content without interaction", () => {
      cy.get('[role="tooltip"]').should("not.be.visible");
    });
    it("shows content on hover", () => {
      cy.get('[aria-haspopup="true"]').trigger("mouseover");
      cy.get('[role="tooltip"]').should("be.visible");
      cy.isInViewport('[role="tooltip"]');
    });
  });
  describe("can be open by default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tooltip--open-by-default");
    });
    it("shows content initially", () => {
      cy.get('[aria-haspopup="true"]').trigger("mouseover");
      cy.get('[role="tooltip"]').should("be.visible");
      cy.isInViewport('[role="tooltip"]');
    });
    it("hides content on hover", () => {
      cy.get('[aria-haspopup="true"]').trigger("mouseover");
      cy.get('[aria-haspopup="true"]').trigger("mouseout");
      cy.wait(2000);
      cy.isNotInViewport('[role="tooltip"]');
    });
  });
});
