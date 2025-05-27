describe("NavigationUserMenu", () => {
  const getUserMenuTrigger = () => cy.get("[aria-label='Toggle user menu']");
  const getUserMenu = () => cy.get("[aria-label='User menu']");

  describe("Basic Usage", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-user-menu--basic-usage&cypressTest=true");
    });

    it("shows user menu button", () => {
      getUserMenuTrigger().should("be.visible");
    });

    it("displays user information in trigger", () => {
      getUserMenuTrigger().contains("haidera@nulogy.com").should("be.visible");
      getUserMenuTrigger().contains("Nulogy").should("be.visible");
      getUserMenuTrigger().contains("Toronto, ON").should("be.visible");
    });

    it("opens user menu when button is clicked", () => {
      getUserMenuTrigger().click();
      getUserMenu().should("be.visible");
    });

    it("displays full user information in header", () => {
      getUserMenuTrigger().click();
      getUserMenu().contains("Haider Alshamma").should("be.visible");
      getUserMenu().contains("haidera@nulogy.com").should("be.visible");
      getUserMenu().contains("Nulogy").should("be.visible");
    });

    it("shows select controls", () => {
      getUserMenuTrigger().click();
      getUserMenu().contains("Company").should("be.visible");
      getUserMenu().contains("User group").should("be.visible");
      getUserMenu().find("[data-testid='select-container']").should("have.length", 2);
    });

    it("shows menu items", () => {
      getUserMenuTrigger().click();
      getUserMenu().contains("Preferences").should("be.visible");
      getUserMenu().contains("Sign out").should("be.visible");
    });

    it("closes user menu when clicking outside", () => {
      getUserMenuTrigger().click();
      getUserMenu().should("be.visible");
      cy.get("body").click("bottomRight");
      getUserMenu().should("not.exist");
    });
  });

  describe("Without A Trigger", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-user-menu--without-a-trigger");
    });

    it("shows disabled user menu when no content is provided", () => {
      getUserMenuTrigger().should("be.disabled");
    });

    it("handles long text in trigger by truncating", () => {
      cy.get("input").first().clear().type("verylongemailaddressthatwillgettruncated@example.com");
      getUserMenuTrigger().should("contain", "verylongemailaddress");
    });
  });

  describe("Header", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-user-menu--header");
    });

    it("opens and shows header content", () => {
      getUserMenu().contains("Haider Alshamma").should("be.visible");
    });
  });

  describe("Controls", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-user-menu--controls");
    });

    it("shows controls without header", () => {
      getUserMenu().contains("Default").should("be.visible");
      getUserMenu().contains("Base").should("be.visible");
    });
  });

  describe("Menu Items", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-user-menu--menu-items&cypressTest=true");
    });

    it("shows link menu items", () => {
      getUserMenuTrigger().click();
      getUserMenu().contains("A menu item can be a link").should("have.attr", "href", "#");
    });

    it("shows button menu items", () => {
      getUserMenuTrigger().click();
      getUserMenu().contains("A menu item can be a button").should("be.visible");
    });

    it("shows nested menu items", () => {
      getUserMenuTrigger().click();
      getUserMenu().contains("A menu item can have nested items").click();
      getUserMenu().contains("Nested item 1").should("be.visible");
      getUserMenu().contains("Nested item 2").should("be.visible");
    });

    it("handles deeply nested menu items", () => {
      getUserMenuTrigger().click();
      getUserMenu().contains("A menu item can have nested items").click();
      getUserMenu().contains("A nested item can have nested items").click();
      getUserMenu().contains("A menu item can be custom rendered").click();
      getUserMenu().contains("This is a custom panel inside the user menu").should("be.visible");
    });

    it("renders custom components in the menu", () => {
      getUserMenuTrigger().click();
      getUserMenu().contains("A menu item can have nested items").click();
      getUserMenu().contains("A nested item can have nested items").click();
      getUserMenu().contains("A menu item can be custom rendered").click();
      getUserMenu().contains("Custom button").should("be.visible");
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.renderFromStorybook("navigation-user-menu--basic-usage&cypressTest=true");
    });

    it("closes with Escape key", () => {
      getUserMenuTrigger().click();
      getUserMenu().should("be.visible");
      cy.focused().type("{esc}");
      getUserMenu().should("not.exist");
    });
  });
});
