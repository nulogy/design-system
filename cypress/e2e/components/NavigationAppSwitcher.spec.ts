describe("NavigationAppSwitcher", () => {
  const getAppSwitcherTrigger = () => cy.get('[aria-label="Toggle app switcher"]');
  const getAppSwitcher = () => cy.get('[aria-label="App switcher"]');

  describe("All Apps", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation-app-switcher--all-apps&cypressTest=true");
    });

    it("shows app switcher button", () => {
      getAppSwitcherTrigger().should("be.visible");
    });

    it("opens app switcher when button is clicked", () => {
      getAppSwitcherTrigger().click();
      getAppSwitcher().should("be.visible");
    });

    it("displays all available apps", () => {
      getAppSwitcherTrigger().click();
      cy.contains("Production Scheduling").should("be.visible");
      cy.contains("Supplier Collaboration").should("be.visible");
      cy.contains("Digital Quality Inspection").should("be.visible");
      cy.contains("Shop Floor").should("be.visible");
      cy.contains("Smart Factory").should("be.visible");
      cy.contains("Connections").should("be.visible");
      cy.contains("Data").should("be.visible");
    });

    it("closes app switcher when clicking outside", () => {
      getAppSwitcherTrigger().click();
      getAppSwitcher().should("be.visible");
      cy.get("body").click("bottomRight");
      getAppSwitcher().should("not.exist");
    });

    it("has correct links for apps", () => {
      getAppSwitcherTrigger().click();
      cy.get('[aria-label="Production Scheduling"]').should("have.attr", "href", "https://nulogy.com/");
      cy.get('[aria-label="Supplier Collaboration"]').should("have.attr", "href", "https://nulogy.com/");
    });
  });

  describe("Only Select Apps", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation-app-switcher--only-select-apps&cypressTest=true");
    });

    it("displays only the specified apps", () => {
      getAppSwitcherTrigger().click();
      cy.contains("Production Scheduling").should("be.visible");
      cy.contains("Digital Quality Inspection").should("be.visible");
      cy.contains("Shop Floor").should("be.visible");

      // These should not be visible
      cy.contains("Supplier Collaboration").should("not.exist");
      cy.contains("Smart Factory").should("not.exist");
      cy.contains("Connections").should("not.exist");
      cy.contains("Data").should("not.exist");
    });
  });

  describe("With Conditionally Visible Apps", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation-app-switcher--with-conditionally-visible-apps&cypressTest=true");
    });

    it("shows default visible apps", () => {
      getAppSwitcherTrigger().click();
      cy.contains("Production Scheduling").should("be.visible");
      cy.contains("Digital Quality Inspection").should("be.visible");
      cy.contains("Shop Floor").should("be.visible");
      getAppSwitcher().contains("Smart Factory").should("not.exist");
    });

    it("shows admin-only apps when admin checkbox is checked", () => {
      cy.contains("User is admin").click();
      getAppSwitcherTrigger().click();
      cy.contains("Smart Factory").should("be.visible");
    });

    it("hides admin-only apps when admin checkbox is unchecked", () => {
      // First make sure it's checked and Smart Factory is visible
      cy.contains("User is admin").click();
      getAppSwitcherTrigger().click();
      cy.contains("Smart Factory").should("be.visible");

      // Close app switcher and uncheck
      cy.get("body").click("bottomRight");
      cy.contains("User is admin").click();

      // Reopen app switcher and verify Smart Factory is hidden
      getAppSwitcherTrigger().click();
      getAppSwitcher().contains("Smart Factory").should("not.exist");
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation-app-switcher--all-apps&cypressTest=true");
    });

    it("has correct ARIA attributes", () => {
      getAppSwitcherTrigger().click();
      getAppSwitcher().should("have.attr", "aria-label", "App switcher");
    });

    it("closes with Escape key", () => {
      getAppSwitcherTrigger().click();
      getAppSwitcher().should("be.visible");
      cy.focused().type("{esc}");
      getAppSwitcher().should("not.exist");
    });
  });
});
