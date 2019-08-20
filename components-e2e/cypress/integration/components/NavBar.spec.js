describe("NavBar", () => {
  context("when in desktop mode", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("can open a submenu on click", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 1").click();

      cy.contains("Menu 1-1").should("exist");
    });

    it("closes a first level submenu on click when one is open", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 1").click();

      cy.contains("Menu 1-1").should("exist");

      cy.contains("Menu 1").click();

      cy.contains("Menu 1-1").should("not.exist");
    });

    it("can open multiple layers of submenus", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").click();

      cy.contains("Menu 2-1-2").click();

      cy.contains("Menu 2-1-2-1").should("exist");
    });

    it("closes all open submenus on escape key press", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").click();

      cy.contains("Menu 2-1-2").click();

      cy.get("body").type("{esc}");

      cy.contains("Menu 2-1").should("not.exist");
    });

    it("closes all open submenus on click outside of menus", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").click();

      cy.contains("Menu 2-1-2").click();

      cy.get("body").click();

      cy.contains("Menu 2-1").should("not.exist");
    });

    it("opens nested submenus on mouse hover of the trigger", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").trigger("mouseover");

      cy.contains("Menu 2-1-2").should("exist");
    });

    it("closes nested submenus on mouse leave of the trigger", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").trigger("mouseover");
      cy.contains("Menu 2-1").trigger("mouseout");

      cy.contains("Menu 2-1-2").should("not.exist");
    });

    it("closes all nested submenus when mouse leaves any nested submenu", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").trigger("mouseover");
      cy.contains("Menu 2-1-2").trigger("mouseover");

      cy.contains("Menu 2-1-2-2").should("exist");

      cy.contains("Menu 2-1-2").trigger("mouseout");

      cy.contains("Menu 2-1-2").should("not.exist");
      cy.contains("Menu 2-1").should("exist");
    });

    it("enforces one submenu tree is open at once", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").should("exist");

      cy.contains("Menu 1").click();

      cy.contains("Menu 2-1").should("not.exist");
    });

    it("enforces one nested submenu tree is open at once", () => {
      cy.renderFromStorybook("navbar--base");

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").click();

      cy.contains("Menu 2-1-1").should("exist");

      cy.contains("Menu 2-2").click();

      cy.contains("Menu 2-1-1").should("not.exist");
    });
  });

  context("when in mobile mode", () => {
    before(() => {
      cy.viewport("ipad-mini");
    });

    it("opens the menu when the button is clicked", () => {
      cy.renderFromStorybook("navbar--base");

      cy.get("nav").should("not.exist");

      cy.get("svg[icon='menu']").click();

      cy.get("nav").should("exist");
    });

    it.only("closes the menu when the button is clicked and menu is open", () => {
      cy.renderFromStorybook("navbar--base");

      cy.get("nav").should("not.exist");

      cy.get("svg[icon='menu']").click();

      cy.get("nav").should("exist");

      cy.get("svg[icon='close']").click();

      cy.get("nav").should("not.exist");
    });
  });
});
