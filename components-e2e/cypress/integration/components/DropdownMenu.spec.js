describe("DropdownMenu", () => {
  const getOpenButton = () => cy.get("button[aria-label='Open']");
  const getCloseButton = () => cy.get("button[aria-label='Close']");
  const getTrigger = () => cy.get("button[class*='IconicButton']");
  const getDropdownLink = () => cy.contains("Dropdown Link");
  const getCustomTrigger = () => cy.contains("Custom Trigger");
  const getDropdownContainer = () => cy.get(".nds-popper-pop-up");
  const assertDropdownIsOpen = () => {
    getCloseButton().should("exist");
    cy.isInViewport("[class*='DropdownLink']");
    getDropdownContainer().should("have.css", "opacity", "1");
  };
  const assertDropdownIsClosed = () => {
    getOpenButton().should("exist");
    cy.get(".nds-popper-pop-up").should("not.exist");
  };

  describe("default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("dropdownmenu--dropdownmenu");
    });
    it("toggles the menu on click", () => {
      getTrigger().click();
      assertDropdownIsOpen();

      getTrigger().click();
      assertDropdownIsClosed();
    });

    it("closes the menu on escape", () => {
      getTrigger().click();

      cy.wait(500);

      cy.pressEscapeKey();

      assertDropdownIsClosed();
    });

    it("closes the menu when clicking outside of it", () => {
      getTrigger().click();

      cy.wait(500);

      cy.clickOutsideElement();

      assertDropdownIsClosed();
    });

    it("scrolls through the list on tabpress", () => {
      getTrigger().click();
      // Add wait for dropdown to render
      cy.wait(500);
      getTrigger().tab();

      getDropdownLink().should("be.focused");
    });
  });
  it("can be opened with a different element", () => {
    cy.renderFromStorybook("dropdownmenu--with-custom-trigger");

    getCustomTrigger().click();

    assertDropdownIsOpen();
  });
});
