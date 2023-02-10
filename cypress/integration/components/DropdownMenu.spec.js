describe("DropdownMenu", () => {
  const getOpenButton = () => cy.get("[aria-label='open dropdown']");
  const getSubmenuButton = () => cy.get("[aria-label='open sub dropdown']");
  const getCloseButton = () => cy.get("[aria-label='close dropdown']");
  const getSubCloseButton = () => cy.get("[aria-label='close sub dropdown']");
  const getDropdownLink = () => cy.contains("Dropdown Link");
  const getDropdownButton = () => cy.contains("Dropdown Button");
  const getSubDropdownButton = () => cy.contains("Inner Dropdown Button");

  const assertDropdownIsOpen = () => {
    getCloseButton().should("exist");
    getDropdownButton().should("exist");
  };
  const assertSubDropdownIsClosed = () => {
    getSubmenuButton().should("exist");
    getSubCloseButton().should("not.exist");
    getSubDropdownButton().should("not.exist");
  };

  const assertSubDropdownIsOpen = () => {
    getSubCloseButton().should("exist");
    getSubDropdownButton().should("exist");
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

  it("handles submenus that open on hover", () => {
    cy.renderFromStorybook("dropdownmenu--with-submenu");

    getOpenButton().click();
    assertDropdownIsOpen();

    getSubmenuButton().trigger('mouseover')
    assertSubDropdownIsOpen();

    getSubCloseButton().trigger('mouseout')
    assertSubDropdownIsClosed();
  });
});
