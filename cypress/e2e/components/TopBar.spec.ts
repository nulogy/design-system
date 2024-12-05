describe("TopBar", () => {
  const menuButton = () => cy.get('[data-testid="topbar-menu-button"]');
  const menu = () => cy.get('[data-testid="topbar-menu"]');
  const menuItems = () => cy.get('[data-testid="topbar-menu-item"]');
  const menuOverlay = () => cy.get('[data-testid="topbar-menu-overlay"]');

  describe("Menu", () => {
    beforeEach(() => {
      cy.renderFromStorybook("topbar--default");
    });

    it("opens menu when menu button is clicked", () => {
      menuButton().click();
      menu().should("be.visible");
    });

    it("closes menu when clicking outside", () => {
      menuButton().click();
      menuOverlay().should("be.visible");
      menuOverlay().click({ force: true });
      menu().should("not.exist");
    });

    it("displays correct number of menu items", () => {
      menuButton().click();
      menuItems().should("have.length", 9); // see Topbar/stories/fixtures.ts
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      cy.renderFromStorybook("topbar--default");
    });

    it("focuses the first focusable element in the page", () => {
      menuButton().focus().type("{enter}");
      menuItems().first().find("a").should("have.focus");
    });

    it("maintains focus trap in menu", () => {
      menuButton().click();
      menuItems().last().find("a").focus().tab();
      menuItems().first().find("a").should("have.focus");
    });

    it("has correct ARIA attributes", () => {
      menuButton().click();
      menu().should("have.attr", "aria-label", "Menu options");
    });
  });
});
