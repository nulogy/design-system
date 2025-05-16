describe("Navigation", () => {
  const getFormsMenu = () => cy.contains("Forms");
  const getAppSwitcherTrigger = () => cy.get('[aria-label="Toggle app switcher"]');
  const getAppSwitcher = () => cy.get('[aria-label="App switcher"]');
  const getUserMenuTrigger = () => cy.get('[aria-label="Toggle user menu"]');
  const getMobileMenuToggle = () => cy.get('[aria-label="Toggle mobile menu"]');
  const getNulogyLogo = () => cy.get('[aria-label="Nulogy Logo"]');

  describe("Basic Navigation", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation--basic-usage");
    });

    it("renders the primary navigation items", () => {
      cy.contains("Dashboard").should("be.visible");
      cy.contains("Inspector").should("be.visible");
      cy.contains("Reports").should("be.visible");
      cy.contains("Sheets").should("be.visible");
      cy.contains("Forms").should("be.visible");
    });

    it("renders secondary navigation items", () => {
      cy.get('[aria-label="Search"]').should("be.visible");
      cy.get('[aria-label="Settings"]').should("be.visible");
    });

    it("shows a dropdown when a primary navigation item with submenu is clicked", () => {
      getFormsMenu().click();
      cy.contains("Quality Inspection Form").should("be.visible");
      cy.contains("Production Report Form").should("be.visible");
      cy.contains("Maintenance Request Form").should("be.visible");
      cy.contains("Inventory Count Form").should("be.visible");
    });

    it("closes a dropdown when clicking outside", () => {
      getFormsMenu().click();
      cy.contains("Quality Inspection Form").should("be.visible");
      cy.get("body").click("bottomRight");
      cy.contains("Quality Inspection Form").should("not.exist");
    });
  });

  describe("App Switcher", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation-app-switcher--all-apps&cypressTest=true");
    });

    it("shows app switcher when clicked", () => {
      getAppSwitcherTrigger().click();
      getAppSwitcher().should("be.visible");
      cy.get('[aria-label="Production Scheduling"]').should("be.visible");
      cy.get('[aria-label="Supplier Collaboration"]').should("be.visible");
      cy.get('[aria-label="Digital Quality Inspection"]').should("be.visible");
    });

    it("closes app switcher when clicking outside", () => {
      cy.get("body").click("bottomRight");
      cy.get('[aria-label="Production Scheduling"]').should("not.exist");
    });
  });

  describe("User Menu", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-user-menu--basic-usage");
    });

    it("shows user menu when clicked", () => {
      getUserMenuTrigger().click();
      cy.contains("Haider Alshamma").should("be.visible");
      cy.contains("haidera@nulogy.com").should("be.visible");
      cy.contains("Nulogy").should("be.visible");
    });

    it("shows user menu controls", () => {
      getUserMenuTrigger().click();
      cy.contains("Company").should("be.visible");
      cy.contains("User group").should("be.visible");
    });

    it("closes user menu when clicking outside", () => {
      getUserMenuTrigger().click();
      cy.contains("Haider Alshamma").should("be.visible");
      cy.get("body").click("bottomRight");
      cy.contains("Haider Alshamma").should("not.exist");
    });

    it("shows menu items in user menu", () => {
      getUserMenuTrigger().click();
      cy.contains("Preferences").should("be.visible");
      cy.contains("Sign out").should("be.visible");
    });
  });

  describe("Navigation with Sub Menus", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-navigation-menus-sub-menus--sub-menus");
    });

    it("shows submenu when parent menu is clicked", () => {
      cy.contains("Company").click();
      cy.contains("Customers").should("be.visible");
      cy.contains("Estimating").should("be.visible");
      cy.contains("Invoices").should("be.visible");
    });

    it("navigates to nested submenus", () => {
      cy.contains("Company").click();
      cy.contains("Invoices").click();
      cy.contains("Customers").should("be.visible");
      cy.contains("Estimating").should("be.visible");
    });

    it("handles deeply nested submenus", () => {
      cy.contains("Company").click();
      cy.contains("Invoices").click();
      cy.contains("Invoices").last().click();
      cy.contains("Customers").should("be.visible");
    });

    it("closes all menus when clicking outside", () => {
      cy.contains("Company").click();
      cy.contains("Invoices").click();
      cy.get("body").click("bottomRight");
      cy.contains("Invoices").should("not.exist");
    });
  });

  describe("Logos", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation-logos--primary-logo");
    });

    it("renders the Nulogy logo", () => {
      getNulogyLogo().should("be.visible");
    });

    it("renders the logo with the correct link", () => {
      getNulogyLogo().should("have.attr", "href", "/");
    });
  });

  describe("Secondary Logo", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-logos--secondary-logo");
    });

    it("renders the secondary logo", () => {
      cy.get("svg").should("have.length.at.least", 2);
    });
  });

  describe("Mobile Navigation", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation-mobile-visibility--default-behavior");
      cy.viewport("iphone-x");
    });

    it("shows mobile menu button on small screens", () => {
      getMobileMenuToggle().should("be.visible");
    });

    it("opens mobile menu when button is clicked", () => {
      getMobileMenuToggle().click();
      cy.contains("Home (Default)").should("be.visible");
      cy.contains("Products (Default)").should("be.visible");
      cy.contains("Settings (Default)").should("be.visible");
    });

    it("closes mobile menu when clicking outside", () => {
      getMobileMenuToggle().click();
      cy.contains("Home (Default)").should("be.visible");
      cy.get("body").click("bottomRight");
      cy.contains("Home (Default)").should("not.exist");
    });
  });

  describe("Mobile Visibility", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation-mobile-visibility--item-in-navigation-bar");
      cy.viewport("iphone-x");
    });

    it("shows items with navigationBar visibility in the mobile navigation bar", () => {
      cy.get('[aria-label="Search"]').should("be.visible");
      cy.get('[aria-label="Notifications"]').should("be.visible");
    });

    it("shows items with navigationMenu visibility in the mobile menu", () => {
      getMobileMenuToggle().click();
      cy.contains("Home (Menu)").should("be.visible");
      cy.contains("Products (Menu)").should("be.visible");
      cy.contains("Help").should("be.visible");
    });
  });

  describe("Custom Breakpoint", () => {
    beforeEach(() => {
      cy.renderFromStorybook("navigation--with-a-custom-breakpoint");
    });

    it("uses desktop navigation at wider viewport", () => {
      cy.viewport(1100, 800);
      getMobileMenuToggle().should("not.exist");
      cy.contains("Dashboard").should("be.visible");
    });

    it("uses mobile navigation at narrower viewport", () => {
      cy.viewport(900, 800);
      getMobileMenuToggle().should("be.visible");
    });
  });
});
