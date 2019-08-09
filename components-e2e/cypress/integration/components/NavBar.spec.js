describe("NavBar", () => {
  context("when in desktop mode", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("can be navigated using the keyboard", () => {
      cy.renderFromStorybook("navbar--base");

      cy.wait(500);
    });
  });

  context("when in mobile mode", () => {
    before(() => {
      cy.viewport("ipad-mini");
    });

    it("renders", () => {
      cy.renderFromStorybook("navbar--base");

      cy.wait(500);
    });
  });
});
