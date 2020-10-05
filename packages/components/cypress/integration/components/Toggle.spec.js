describe("Tooltip", () => {
  const getToggle = () => cy.get("[data-testid='toggle-example']");
  const getToggleInput = () => cy.get("[data-testid='toggle-example'] input");
  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("toggle--toggle");
    });
    it("changes the value on click", () => {
      getToggleInput().should("have.value", "off");
      getToggle().click();
      getToggleInput().should("have.value", "on");
    });
  });
});
