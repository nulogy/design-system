describe("NavBar", () => {
  context("when in desktop mode", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("can be navigated using the keyboard", () => {
      cy.visit(
        "http://localhost:8080/iframe.html?path=/story/fortests--navbar"
      );

      cy.wait(500);
    });
  });

  context("when in mobile mode", () => {
    before(() => {
      cy.viewport("ipad-mini");
    });

    it("renders", () => {
      cy.visit(
        "http://localhost:8080/iframe.html?path=/story/fortests--navbar"
      );
      cy.wait(500);
    });
  });
});
