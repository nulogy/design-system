describe("Tooltip", () => {
  const triggerSelector = "button";

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tooltip--tooltip");
    });

    it("hides content without interaction", () => {
      cy.get('[role="tooltip"]').should("not.exist");
    });

    it("shows content on hover", () => {
      cy.assertTooltip(triggerSelector, "I am a Tooltip!");
    });

    it("hides content on hover away", () => {
      // hover
      cy.get(triggerSelector).realHover();
      cy.assertTooltip(triggerSelector, "I am a Tooltip!");

      // hover away
      cy.get("body").realHover();
      cy.wait(2000);
      cy.assertNoTooltip(triggerSelector);
    });
  });
});
