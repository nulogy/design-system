describe("Tooltip", () => {
  const triggerSelector = "[data-testid='tooltip-trigger']";

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tooltip--default");
    });

    it("hides content without interaction", () => {
      cy.get('[role="tooltip"]').should("not.exist");
    });

    it("shows content on hover", () => {
      cy.assertTooltip(triggerSelector, "I am a Tooltip!");
    });
  });
});
