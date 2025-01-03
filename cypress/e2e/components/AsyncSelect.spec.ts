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

      cy.focused().type("on");
      assertDropDownIsOpen().contains("Ontario");
      cy.focused().type("{enter}");

      cy.focused().type("qu");
      assertDropDownIsOpen().contains("Quebec");
      cy.focused().type("{enter}");

      getMultiselect().contains("Ontario");
      getMultiselect().contains("Quebec");
    });

    describe("clears selected values", () => {
      it("clears all multiselect values", () => {
        getMultiselect().click();

        cy.focused().type("on");
        assertDropDownIsOpen().contains("Ontario");
        cy.focused().type("{enter}");

        getClearButton().click();

        getMultiselect().contains("Enter a province");
      });

      it("clears single-select values", () => {
        getSelectComponent().click();

        cy.focused().type("on");
        assertDropDownIsOpen().contains("Ontario");
        cy.focused().type("{enter}");

        getClearButton().click();

        getMultiselect().contains("Enter a province");
      });
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
