describe("AsyncSelect", () => {
  const getSelectComponent = () => cy.get("[data-testid='select-container']");
  const getDropdownMenu = () => cy.get("[data-testid='select-dropdown']");
  const getMultiselect = () => getSelectComponent();
  const getClearButton = () => cy.get("[data-testid='select-clear']");
  const assertDropDownIsOpen = () => getDropdownMenu().should("exist");

  describe("Multiselect", () => {
    beforeEach(() => {
      cy.renderFromStorybook("asyncselect--multiselect");
    });

    it("can select multiple values", () => {
      getMultiselect().click();

      cy.focused().type("cana");
      assertDropDownIsOpen().contains("Canada");
      cy.focused().type("{enter}");

      cy.focused().type("austra");
      assertDropDownIsOpen().contains("Australia");
      cy.focused().type("{enter}");

      getMultiselect().contains("Canada");
      getMultiselect().contains("Australia");
    });

    it("clears all selected values", () => {
      getMultiselect().click();

      cy.focused().type("cana");
      cy.wait(200);
      cy.focused().type("{enter}");

      getClearButton().click();

      getMultiselect().contains("Please select a countries");
    });

    it("does not show the dropdown arrow", () => {
      getDropdownMenu().should("not.exist");
    });

    it("does not show the clear button when no values are selected", () => {
      getClearButton().should("not.exist");
    });
  });
});
