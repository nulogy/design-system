describe("Toast", () => {
  const TOAST_SELECTOR = '[role="alert"]';
  const toast = () => cy.get(TOAST_SELECTOR);
  const button = () => cy.get("button").contains("Save Changes");
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
  describe("Closeable", () => {
    const CLOSE_BTN_SELECTOR = '[aria-label="Close"]';
    beforeEach(() => {
      cy.renderFromStorybook("toast--with-close-button");
    });

    it("is hidden by default", () => {
      toast().should("have.css", "opacity", "0");
    });

    it("shows the alert when triggered and does not automatically hide it", () => {
      button().click();
      cy.isInViewport(TOAST_SELECTOR);
      toast().should("have.css", "opacity", "1");
      cy.wait(4000);
      toast().should("have.css", "opacity", "1");
    });
    it("hides the alert when close button is clicked", () => {
      button().click();
      toast().should("have.css", "opacity", "1");
      cy.get(CLOSE_BTN_SELECTOR).click();
      cy.wait(4000);
      toast().should("not.exist");
    });
  });
});
