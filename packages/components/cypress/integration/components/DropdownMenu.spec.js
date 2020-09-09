describe("DropdownMenu", () => {
  const getOpenButton = () => cy.get("[aria-label='open dropdown']");
  const getCloseButton = () => cy.get("[aria-label='close dropdown']");
  const getDropdownLink = () => cy.contains("Dropdown Link");
  const getDropdownButton = () => cy.contains("Dropdown Button");
  const assertDropdownIsOpen = () => {
    getCloseButton().should("exist");
    getDropdownButton().should("exist");
  };
  const assertDropdownIsClosed = () => {
    getOpenButton().should("exist");
    getCloseButton().should("not.exist");
    getDropdownButton().should("not.exist");
  };

  describe("default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("dropdownmenu--dropdown-menu");
    });
    it("toggles the menu on click", () => {
      getOpenButton().click();
      assertDropdownIsOpen();

      getCloseButton().click();
      assertDropdownIsClosed();
    });

    it("closes the menu on escape", () => {
      getOpenButton().click();

      cy.wait(500);

      cy.pressEscapeKey();

      assertDropdownIsClosed();
    });

    it("closes the menu when clicking outside of it", () => {
      getOpenButton().click();

      cy.wait(500);

      cy.clickOutsideElement();

      assertDropdownIsClosed();
    });

    it("scrolls through the list on tabpress", () => {
      getOpenButton().click();
      // Add wait for dropdown to render
      cy.wait(500);
      getCloseButton().tab();

      getDropdownLink().should("be.focused");
    });
  });
  it("can be opened with a different element", () => {
    cy.renderFromStorybook("dropdownmenu--with-custom-trigger");

    getOpenButton().click();

    assertDropdownIsOpen();
  });
});
