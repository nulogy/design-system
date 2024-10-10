describe("Select", () => {
  const getSelectComponent = () => cy.get("[data-testid='select-container']");
  const getDropdownMenu = () => cy.get("[data-testid='select-dropdown']");
  const getValue = () => cy.get("[data-testid='select-control']");
  const getMultiselect = () => getSelectComponent();
  const getSelectedItems = () => cy.get("[data-testid='select-multivalue']");
  const getCloseButtons = () => cy.get("[data-testid='select-multivalue'] svg");
  const getClearButton = () => cy.get("[data-testid='select-clear']");
  const assertDropDownIsClosed = () => getDropdownMenu().should("not.exist");
  const assertDropDownIsOpen = () => getDropdownMenu().should("exist");

  describe("Multiselect", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-multiselect");
    });

    it("has the correct initial state", () => {
      cy.contains("PCN1");
      cy.contains("PCN2");
      cy.contains("PCN3").should("not.exist");
    });

    it("can select all values", () => {
      getMultiselect().click();

      cy.focused().type("{enter}");

      getMultiselect().click();

      cy.focused().type("{enter}");

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
      getMultiselect().contains("PCN4");
      getMultiselect().contains("PCN9");
    });

    it("selects the first item when opened", () => {
      getMultiselect().click();

      cy.focused().type("{enter}");

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
      getMultiselect().contains("PCN4");
      getMultiselect().contains("PCN9").should("not.exist");
    });

    it("removes a selected item", () => {
      getCloseButtons().first().click();

      getMultiselect().contains("PCN1");
    });

    it("removes using the keyboard", () => {
      getMultiselect().click();

      cy.focused().type("{leftarrow}");

      cy.focused().type("{del}");

      getMultiselect().contains("PCN2");
    });

    it("removes all selected items", () => {
      getSelectedItems().should("have.length", 2);

      getCloseButtons().first().click();

      getCloseButtons().first().click();

      getMultiselect().contains("Please select inventory status");
    });

    it("clears all selected items", () => {
      getClearButton().click();

      getMultiselect().contains("Please select inventory status");
    });
  });

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--select");
    });
    it("selects the first item when opened", () => {
      getSelectComponent().click();

      cy.focused().type("{enter}");

      getValue().should("have.text", "Accepted");
    });

    it("selects an option on click", () => {
      assertDropDownIsClosed();

      getSelectComponent().click();

      getSelectComponent().contains("Assigned to a line").click();

      getValue().should("have.text", "Assigned to a line");
      assertDropDownIsClosed();
    });

    it("closes the dropdown when clicking outside", () => {
      getSelectComponent().click();
      assertDropDownIsOpen();

      cy.get("body").click("bottomRight");
      assertDropDownIsClosed();
    });

    it("selects options using the keyboard", () => {
      // focus the select box
      getSelectComponent().click();

      cy.focused().type("{downarrow}").type("{enter}");

      assertDropDownIsClosed();
      getValue().should("have.text", "Assigned to a line");
    });

    it("closes the dropdown when on esc", () => {
      getSelectComponent().click();
      assertDropDownIsOpen();

      cy.focused().type("{esc}");
      assertDropDownIsClosed();
    });
  });

  describe("with clear button", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-a-clear-button");
    });

    it("clears single-select values", () => {
      getSelectComponent().click();
      cy.focused().type("{downarrow}").type("{enter}");

      getClearButton().click();

      getSelectComponent().contains("Please select inventory status");
    });
  });

  describe("with state", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-state");
    });
    it("works as a controlled component", () => {
      assertDropDownIsClosed();

      getSelectComponent().click();
      getSelectComponent().contains("Assigned to a line").click();

      getValue().should("have.text", "Assigned to a line");
      assertDropDownIsClosed();
    });
  });
  describe("with close menu after selection turned off", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-close-menu-on-select-turned-off");
    });
    it("does not close the menu after selecting an option", () => {
      assertDropDownIsClosed();

      getMultiselect().click();

      cy.focused().type("{enter}");

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
      getMultiselect().contains("PCN4");

      assertDropDownIsOpen();
    });
  });
});
