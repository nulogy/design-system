describe("AsyncSelect", () => {
  const getSelectComponent = () => cy.get("[data-testid='select-container']");
  const getDropdownMenu = () => cy.get("[data-testid='select-dropdown']");
  const getMultiselect = () => getSelectComponent();
  const getClearButton = () => cy.get("[data-testid='select-clear']");
  const getDropdownButton = () => cy.get("[data-testid='select-arrow']");
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

      cy.focused().type("mex");
      assertDropDownIsOpen().contains("Mexico");
      cy.focused().type("{enter}");

      getMultiselect().contains("Canada");
      getMultiselect().contains("Mexico");
    });

    it("clears all selected values", () => {
      getMultiselect().click();

      cy.focused().type("cana");
      assertDropDownIsOpen().contains("Canada");
      cy.focused().type("{enter}");

      getClearButton().click();

      getMultiselect().contains("Please select a countries");
    });

    it("does not show the dropdown arrow", () => {
      getDropdownButton().should("not.be.visible");
    });

    it("does not show the clear button when no values are selected", () => {
      getClearButton().should("not.exist");
    });
  });

  describe("with default options", () => {
    beforeEach(() => {
      cy.renderFromStorybook("asyncselect--with-default-options");
    });

    it("shows the dropdown arrow if there are default options", () => {
      getDropdownButton().should("be.visible");
    });
  });
});
