describe("Switcher", () => {
  describe("with selected value", () => {
    beforeEach(() => {
      cy.renderFromStorybook("switcher--with-selected-value");
    });
    it("focuses on the selected switch", () => {
      cy.focused().should("have.text", "Option 2");
    });
  })
});
