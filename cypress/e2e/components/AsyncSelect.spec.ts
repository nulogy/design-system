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

  describe.only("AsyncSelect with GraphQL", () => {
    const getSelectComponent = () => cy.get("[data-testid='select-container']");
    const getDropdownMenu = () => cy.get("[data-testid='select-dropdown']");
    const assertDropDownIsOpen = () => getDropdownMenu().should("exist");

    beforeEach(() => {
      cy.renderFromStorybook("asyncselect-graphql--with-apollo-client-example");
    });

    it("loads and filters countries based on input", () => {
      getSelectComponent().click();
      cy.focused().type("cana");

      assertDropDownIsOpen();
      getDropdownMenu().contains("Canada");
      getDropdownMenu().should("not.contain", "Mexico");
    });

    it("can select a country", () => {
      getSelectComponent().click();
      cy.focused().type("cana");
      assertDropDownIsOpen();
      cy.focused().type("{enter}");

      getSelectComponent().contains("Canada");
    });

    it("shows placeholder text initially", () => {
      getSelectComponent().contains("Search for a country");
    });

    it("shows label text", () => {
      cy.contains("Country");
    });

    it("handles empty search results", () => {
      getSelectComponent().click();
      cy.focused().type("xyz");

      assertDropDownIsOpen();
      getDropdownMenu().contains("No options");
    });
  });
});
