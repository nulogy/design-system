describe("Toast", () => {
  const TOAST_SELECTOR = '[role="alert"]';
  const toast = () => cy.get(TOAST_SELECTOR);
  const button = () => cy.get("button");
  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("toast--toast");
    });

    it("is hidden by default", () => {
      toast().should("have.css", "opacity", "0");
    });

    it("shows and hides alert when triggered", () => {
      button().click();
      cy.isInViewport(TOAST_SELECTOR);
      toast().should("have.css", "opacity", "1");
      cy.wait(4000);
      toast().should("have.css", "opacity", "0");
    });

    it("continues to show the alert when hovered over", () => {
      button().click();
      toast().should("have.css", "opacity", "1");
      toast().trigger("mouseover");
      cy.wait(4000);
      toast().should("have.css", "opacity", "1");
    });
    it("hides the alert on mouseleave", () => {
      button().click();
      toast().should("have.css", "opacity", "1");
      toast().trigger("mouseover");
      cy.wait(4000);
      toast().should("have.css", "opacity", "1");
      toast().trigger("mouseover");
      cy.wait(2000);
    });
  });
});
