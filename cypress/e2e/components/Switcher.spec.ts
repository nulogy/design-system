describe("Switcher", () => {
  describe("with selected value", () => {
    beforeEach(() => {
      cy.renderFromStorybook("switcher--with-other-interactive-elements");
    });
    it("focuses on the selected switch", () => {
      cy.get("button").contains("Click me").tab();
      cy.focused().should("have.text", "Option 2");
    });
  });
});
