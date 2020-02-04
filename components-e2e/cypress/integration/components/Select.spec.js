describe("Select", () => {
  const getSelectComponent = () => cy.get(".Select");
  const getSelectOptions = () => cy.get(".SelectTest__option");
  const getDropdownMenu = () => cy.get(".SelectTest__menu");
  const getValue = () => cy.get(".SelectTest__control");
  const getSelectedItems = () => cy.get("div[class*='multiValue']");
  const getCloseButtons = () =>
    cy.get("div[class*='multiValue'] div:last-child");
  const getClearButton = () =>
    cy.get("div[class*='indicatorContainer']").first();
  const assertDropDownIsClosed = () => getDropdownMenu().should("not.exist");
  const assertDropDownIsOpen = () => getDropdownMenu().should("exist");

  describe("Multiselect", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-multiselect");
    });

    it("has the correct initial state", () => {
      getSelectedItems()
        .first()
        .should("have.text", "PCN2");
      getSelectedItems()
        .eq(1)
        .should("have.text", "PCN1");
      getSelectedItems().should("have.length", 2);
    });

    it("can select all values", () => {
      getSelectComponent().click();

      cy.focused().type("{enter}");

      getSelectComponent().click();

      cy.focused().type("{enter}");

      getSelectedItems()
        .eq(2)
        .should("have.text", "PCN4");
      getSelectedItems()
        .eq(3)
        .should("have.text", "PCN9");
      getSelectedItems().should("have.length", 4);
    });

    it("selects the first item when opened", () => {
      getSelectComponent().click();

      cy.focused().type("{enter}");

      getSelectedItems()
        .eq(2)
        .should("have.text", "PCN4");
      getSelectedItems().should("have.length", 3);
    });

    it("removes a selected item", () => {
      getSelectedItems().should("have.length", 2);

      getCloseButtons()
        .first()
        .click();

      getSelectedItems().should("have.length", 1);
    });

    it("removes using the keyboard", () => {
      getSelectComponent().click();

      cy.focused().type("{leftarrow}");

      cy.focused().type("{del}");

      getSelectedItems().should("have.length", 1);
    });

    it("removes all selected items", () => {
      getSelectedItems().should("have.length", 2);

      getCloseButtons()
        .first()
        .click();

      getCloseButtons()
        .first()
        .click();

      getSelectedItems().should("have.length", 0);
    });

    it("clears all selected items", () => {
      getClearButton().click();

      getSelectedItems().should("have.length", 0);
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

      getDropdownMenu()
        .contains("Assigned to a line")
        .click();

      getValue().should("have.text", "Assigned to a line");
      assertDropDownIsClosed();
    });

    it("closes the dropdown when clicking outside", () => {
      getSelectComponent().click();
      assertDropDownIsOpen();

      cy.get("div#root").click("bottomRight");
      assertDropDownIsClosed();
    });

    it("selects options using the keyboard", () => {
      // focus the select box
      getSelectComponent().click();

      cy.focused()
        .type("{downarrow}")
        .type("{enter}");

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

  describe("with state", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-state");
    });
    it("works as a controlled component", () => {
      assertDropDownIsClosed();

      getSelectComponent().click();
      getSelectOptions()
        .eq(1)
        .click();

      getValue().should("have.text", "Assigned to a line");
      assertDropDownIsClosed();
    });
  });
});
