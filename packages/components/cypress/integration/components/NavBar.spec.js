describe("NavBar", () => {
  const BASE_STORY = "navbar--nav-bar";
  const CUSTOM_COMPONENTS_STORY = "navbar--with-custom-link-components";

  context("when in desktop mode", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    describe("default", () => {
      beforeEach(() => {
        cy.renderFromStorybook(BASE_STORY);
      });
      it("can open a submenu on click", () => {
        cy.contains("Invoices").should("not.exist");

        cy.contains("Dashboard").click();

        cy.contains("Invoices").should("exist");
      });

      it("closes a first level submenu on click when one is open", () => {
        cy.contains("Dashboard").click();

        cy.contains("Invoices").should("exist");

        cy.contains("Dashboard").click();

        cy.contains("Invoices").should("not.exist");
      });

      it("can open multiple layers of submenus", () => {
        cy.contains("Operations").click();

        cy.contains("Production").click();

        cy.contains("Projects").click();

        cy.contains("Cycle").should("exist");
      });

      it("closes all open submenus on escape key press", () => {
        cy.contains("Operations").click();

        cy.contains("Production").click();

        cy.contains("Projects").click();

        cy.contains("Cycle").should("exist");

        cy.get("body").type("{esc}");

        cy.contains("Projects").should("not.exist");
      });

      it("closes all open submenus on click outside of menus", () => {
        cy.contains("Operations").click();

        cy.contains("Production").click();

        cy.contains("Projects").click();

        cy.contains("Cycle").should("exist");

        cy.get("body").click();

        cy.contains("Projects").should("not.exist");
      });

      it("opens nested submenus on mouse hover of the trigger", () => {
        cy.contains("Operations").click();

        cy.contains("Production").trigger("mouseover");

        cy.contains("Jobs").should("exist");
      });

      it("closes nested submenus on mouse leave of the trigger", () => {
        cy.contains("Operations").click();

        cy.contains("Production").trigger("mouseover");
        cy.contains("Production").trigger("mouseout");

        cy.contains("Jobs").should("not.exist");
      });

      it("closes all nested submenus when mouse leaves any nested submenu", () => {
        cy.contains("Operations").click();

        cy.contains("Production").trigger("mouseover");
        cy.contains("Projects").trigger("mouseover");

        cy.contains("Cycle Counts").should("exist");

        cy.contains("Cycle Counts").trigger("mouseout");

        cy.contains("Cycle Counts").should("not.exist");
        cy.contains("Production").should("exist");
      });

      it("enforces one submenu tree is open at once", () => {
        cy.contains("Operations").click();

        cy.contains("Production").should("exist");

        cy.contains("Dashboard").click();

        cy.contains("Production").should("not.exist");
      });

      it("enforces one nested submenu tree is open at once", () => {
        cy.contains("Operations").click();

        cy.contains("Production").click();

        cy.contains("Jobs").should("exist");

        cy.contains("Operations").click();

        cy.contains("Jobs").should("not.exist");
      });

      it("renders the search component", () => {
        cy.get("input[type='search']").should("exist");
      });
    });

    describe("custom components", () => {
      beforeEach(() => {
        cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);
      });
      it("renders custom components in the menu", () => {
        cy.contains("Custom Link").should("exist");
      });

      it("renders custom components in the submenu", () => {
        cy.contains("Dashboard").click();
        cy.contains("Invoices").click();
        cy.contains("NormalLink").should("exist");
        cy.contains("CustomLink").should("exist");
      });
    });
  });

  context("when in mobile mode", () => {
    before(() => {
      cy.viewport("ipad-mini");
    });

    describe("default", () => {
      beforeEach(() => {
        cy.renderFromStorybook(BASE_STORY);
      });
      it("opens the menu when the button is clicked", () => {
        cy.get("nav").should("not.exist");

        cy.get("svg[icon='menu']").click();

        cy.get("nav").should("exist");
      });

      it("closes the menu when the button is clicked and menu is open", () => {
        cy.get("svg[icon='menu']").click();

        cy.get("nav").should("exist");

        cy.get("svg[icon='close']").click();

        cy.get("nav").should("not.exist");
      });

      it("renders all nested menu links", () => {
        cy.get("svg[icon='menu']").click();

        cy.contains("Operations").should("exist");
        cy.contains("Cycle Counts").should("exist");
        cy.contains("Link").should("exist");
        cy.contains("Item Lists").should("exist");
      });

      it("closes the menu on escape key press", () => {
        cy.get("svg[icon='menu']").click();

        cy.get("nav").should("exist");

        cy.get("body").type("{esc}");

        cy.get("nav").should("not.exist");
      });

      it("closes the menu on escape key press", () => {
        cy.get("svg[icon='menu']").click();

        cy.get("nav").should("exist");

        cy.get("body").type("{esc}");

        cy.get("nav").should("not.exist");
      });

      it("resets the scroll position of the menu when closed and opened", () => {
        cy.get("svg[icon='menu']").click();

        cy.get("header").scrollTo("bottom");

        cy.get("body").type("{esc}");
        cy.get("svg[icon='menu']").click();

        cy.get("header").should("have.prop", "scrollTop", 0);
      });

      it("renders the search component", () => {
        cy.get("input[type='search']").should("exist");
      });
    });

    describe("custom components", () => {
      beforeEach(() => {
        cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);
      });
      it("renders custom components in top level", () => {
        cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);
        cy.get("svg[icon='menu']").click();

        cy.contains("Custom Link").should("exist");
      });

      it("renders custom components in nested levels", () => {
        cy.renderFromStorybook(CUSTOM_COMPONENTS_STORY);
        cy.get("svg[icon='menu']").click();

        cy.contains("Customers CustomLink").should("exist");
        cy.contains("CustomLink").should("exist");
      });
    });
  });
});
