describe("NavBar", () => {
  const BASE_STORY = "storiesfortests-navbar--base";
  const CUSTOM_COMPONENTS_STORY =
    "storiesfortests-navbar--custom-render-components";

  context("when in desktop mode", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("can open a submenu on click", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 1").click();

      cy.contains("Menu 1-1").should("exist");
    });

    it("closes a first level submenu on click when one is open", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 1").click();

      cy.contains("Menu 1-1").should("exist");

      cy.contains("Menu 1").click();

      cy.contains("Menu 1-1").should("not.exist");
    });

    it("can open multiple layers of submenus", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").click();

      cy.contains("Menu 2-1-2").click();

      cy.contains("Menu 2-1-2-1").should("exist");
    });

    it("closes all open submenus on escape key press", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").click();

      cy.contains("Menu 2-1-2").click();

      cy.get("body").type("{esc}");

      cy.contains("Menu 2-1").should("not.exist");
    });

    it("closes all open submenus on click outside of menus", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").click();

      cy.contains("Menu 2-1-2").click();

      cy.get("body").click();

      cy.contains("Menu 2-1").should("not.exist");
    });

    it("opens nested submenus on mouse hover of the trigger", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").trigger("mouseover");

      cy.contains("Menu 2-1-2").should("exist");
    });

    it("closes nested submenus on mouse leave of the trigger", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").trigger("mouseover");
      cy.contains("Menu 2-1").trigger("mouseout");

      cy.contains("Menu 2-1-2").should("not.exist");
    });

    it("closes all nested submenus when mouse leaves any nested submenu", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").trigger("mouseover");
      cy.contains("Menu 2-1-2").trigger("mouseover");

      cy.contains("Menu 2-1-2-2").should("exist");

      cy.contains("Menu 2-1-2").trigger("mouseout");

      cy.contains("Menu 2-1-2").should("not.exist");
      cy.contains("Menu 2-1").should("exist");
    });

    it("enforces one submenu tree is open at once", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").should("exist");

      cy.contains("Menu 1").click();

      cy.contains("Menu 2-1").should("not.exist");
    });

    it("enforces one nested submenu tree is open at once", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.contains("Menu 2").click();

      cy.contains("Menu 2-1").click();

      cy.contains("Menu 2-1-1").should("exist");

      cy.contains("Menu 2-2").click();

      cy.contains("Menu 2-1-1").should("not.exist");
    });

    it("renders the search component", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.get("input[type='search']").should("exist");
    });

    it("renders text in the menu", () => {
      cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);

      cy.contains("Text").should("exist");
      cy.contains("Text 2").should("exist");
    });

    it("renders custom components in the menu", () => {
      cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);

      cy.contains("Custom").should("exist");
      cy.contains("Custom 2").should("exist");
    });

    it("renders text in the submenu", () => {
      cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);

      cy.contains("Button").click();
      cy.contains("Submenu Text").should("exist");

      cy.contains("Button 2").click();
      cy.contains("Submenu Text 2").should("exist");
    });

    it("renders custom components in the submenu", () => {
      cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);

      cy.contains("Button").click();
      cy.contains("Submenu Custom").should("exist");

      cy.contains("Button 2").click();
      cy.contains("Submenu Custom 2").should("exist");
    });
  });

  context("when in mobile mode", () => {
    before(() => {
      cy.viewport("ipad-mini");
    });

    it("opens the menu when the button is clicked", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.get("nav").should("not.exist");

      cy.get("svg[icon='menu']").click();

      cy.get("nav").should("exist");
    });

    it("closes the menu when the button is clicked and menu is open", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.get("svg[icon='menu']").click();

      cy.get("nav").should("exist");

      cy.get("svg[icon='close']").click();

      cy.get("nav").should("not.exist");
    });

    it("renders all nested menu links", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.get("svg[icon='menu']").click();

      cy.contains("Menu 1").should("exist");
      cy.contains("Menu 2-1-2-2").should("exist");
      cy.contains("Menu 3").should("exist");
      cy.contains("Menu 4-2").should("exist");
    });

    it("closes the menu on escape key press", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.get("svg[icon='menu']").click();

      cy.get("nav").should("exist");

      cy.get("body").type("{esc}");

      cy.get("nav").should("not.exist");
    });

    it("closes the menu on escape key press", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.get("svg[icon='menu']").click();

      cy.get("nav").should("exist");

      cy.get("body").type("{esc}");

      cy.get("nav").should("not.exist");
    });

    it("resets the scroll position of the menu when closed and opened", () => {
      cy.viewport("iphone-6");

      cy.renderFromStorybook(BASE_STORY);

      cy.get("svg[icon='menu']").click();

      cy.get("header").scrollTo("bottom");

      cy.get("body").type("{esc}");
      cy.get("svg[icon='menu']").click();

      cy.get("header").should("have.prop", "scrollTop", 0);
    });

    it("renders the search component", () => {
      cy.renderFromStorybook(BASE_STORY);

      cy.get("input[type='search']").should("exist");
    });

    it("renders text in top level", () => {
      cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);

      cy.contains("Text").should("exist");
      cy.contains("Text 2").should("exist");
    });

    it("renders custom components in top level", () => {
      cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);

      cy.contains("Custom").should("exist");
      cy.contains("Custom 2").should("exist");
    });

    it("renders text in nested levels", () => {
      cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);

      cy.contains("Submenu Text").should("exist");
      cy.contains("Submenu Text 2").should("exist");
    });

    it("renders custom components in nested levels", () => {
      cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);

      cy.contains("Submenu Custom").should("exist");
      cy.contains("Submenu Custom 2").should("exist");
    });
  });
});
