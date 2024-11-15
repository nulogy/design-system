describe("BottomSheet", () => {
  const BottomSheet = () => cy.get('[role="dialog"]');
  const openButton = () => cy.contains("Open Sheet");
  const overlay = () => cy.get("[data-reach-dialog-overlay]");
  const closeButton = () => cy.contains("Close");

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("bottomsheet--basic-usage");
      overlay().click({ force: true });
    });

    it("is hidden", () => {
      BottomSheet().should("not.to.exist");
    });

    it("slides up when triggered", () => {
      openButton().click();
      BottomSheet().should("be.visible");
    });

    it("slides down when overlay is clicked", () => {
      openButton().click();
      overlay().should("be.visible");
      overlay().click({ force: true });
      BottomSheet().should("not.be.visible");
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      cy.renderFromStorybook("bottomsheet--basic-usage");
      overlay().click({ force: true });
    });

    it("focuses the close button when opened", () => {
      openButton().click();
      cy.focused().type("{enter}");
      BottomSheet().should("not.be.visible");
    });

    it("focuses the trigger when closed", () => {
      openButton().click();
      cy.focused().type("{enter}");
      BottomSheet().should("not.to.exist");
      cy.focused().type("{enter}");
      BottomSheet().should("be.visible");
    });
  });

  describe("With hidden close button", () => {
    beforeEach(() => {
      cy.renderFromStorybook("bottomsheet-actions--with-a-hidden-close-button");
      overlay().click({ force: true });
    });

    it("does not show close button", () => {
      openButton().click();
      closeButton().should("not.exist");
    });

    it("can be closed using primary action", () => {
      openButton().click();
      cy.contains("Submit").click();
      BottomSheet().should("not.exist");
    });
  });

  describe("Disable close on overlay click", () => {
    beforeEach(() => {
      cy.renderFromStorybook("bottomsheet-features--disable-close-on-overlay-click");
    });

    it("does not close when clicking overlay", () => {
      overlay().click({ force: true });
      BottomSheet().should("be.visible");
    });

    it("closes when close button is clicked", () => {
      closeButton().click();
      BottomSheet().should("not.be.visible");
    });
  });
});
