describe("DropdownMenu", () => {
  const getOpenButton = () => cy.get("button[aria-label='Open']");
  const getCloseButton = () => cy.get("button[aria-label='Close']");
  const getDropdownLink = () => cy.contains("Dropdown Link");
  const getCustomTrigger = () => cy.get("button.customtrigger");
  const getDropdownContainer = () => cy.get(".nds-popper-pop-up");
  const assertDropdownIsOpen = () => {
    getCloseButton().should("exist");
    cy.isInViewport("[class*='DropdownLink']");
    getDropdownContainer().should("have.css", "opacity", "1");
  };
  const assertDropdownIsClosed = () => {
    getOpenButton().should("exist");
    cy.isNotInViewport(".nds-popper-pop-up");
  };

  describe("default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("storiesfortests-dropdownmenu--base");
    });
    it("toggles the menu on click", () => {
      cy.get("button").click();
      assertDropdownIsOpen();

      cy.get("button").click();
      assertDropdownIsClosed();
    });

    it("closes the menu on escape", () => {
      cy.get("button")
        .click()
        .click();

      cy.pressEscapeKey();

      assertDropdownIsClosed();
    });

    it("closes the menu when clicking outside of it", () => {
      cy.get("button").click();

      cy.clickOutsideElement();

      assertDropdownIsClosed();
    });

    it("scrolls through the list on tabpress", () => {
      cy.get("button")
        .click()
        .tab();

      getDropdownLink().should("be.focused");
    });
  });
  it("can be opened with a different element", () => {
    cy.renderFromStorybook("storiesfortests-dropdownmenu--custom-trigger");

    getCustomTrigger().click();

    assertDropdownIsOpen();
  });
});
