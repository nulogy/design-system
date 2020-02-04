describe("Tabs", () => {
  describe("default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--tabs");
    });
    it("renders tab components", () => {
      cy.get(".Tab1").should("have.text", "Tab 1");
    });

    it("selects the tab on click", () => {
      cy.get(".Tab1")
        .should("have.attr", "aria-selected", "false")
        .click()
        .should("have.attr", "aria-selected", "true");
    });

    it("moves focus to the tab on click", () => {
      cy.get(".Tab1").click();

      cy.focused().should("have.text", "Tab 1");
    });

    it("displays the tab content on click", () => {
      cy.get(".Tab1").click();

      cy.get("[aria-hidden=false]").should("have.text", "Tab 1 Content");
    });

    it("selects a tab when enter is pressed on it", () => {
      cy.get(".Tab1")
        .type("{enter}")
        .should("have.attr", "aria-selected", "true");
    });

    it("focuses the first tab by default", () => {
      cy.get("button[tabindex=0]").focus();

      cy.focused().should("have.text", "Tab 1");
    });

    it("will remember the last tab that was focused when focus leaves and then returns", () => {
      cy.get("button[tabindex=0]").type("{rightarrow}");

      cy.focused().should("have.text", "Tab 2");

      cy.focused().blur();

      cy.focused().should("not.exist");

      cy.get("button[tabindex=0]").should("have.text", "Tab 2");
    });

    it("moves to the next tab when right arrow key is pressed", () => {
      cy.get(".Tab1").type("{rightarrow}");

      cy.focused().should("have.text", "Tab 2");
    });

    it("moves to the previous tab whenleft arrow key is pressed", () => {
      cy.get(".Tab2").type("{leftarrow}");

      cy.focused().should("have.text", "Tab 1");
    });

    it("moves to the first tab when right arrow key is pressed on last tab", () => {
      cy.get(".Tab4").type("{rightarrow}");

      cy.focused().should("have.text", "Tab 1");
    });

    it("moves to the last tab when left arrow key is pressed on first tab", () => {
      cy.get(".Tab1").type("{leftarrow}");

      cy.focused().should("have.text", "Tab 4");
    });
  });

  describe("with scrolling", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--with-scrolling-tabs");
    });
    it("only renders right scroll indicator when tabs are hidden on the right", () => {
      cy.get("svg[icon=leftArrow]").should("not.exist");
      cy.get("svg[icon=rightArrow]").should("exist");
    });

    it("only renders left scroll indicator when tabs are hidden on the left", () => {
      cy.get(".tab-container").scrollTo("right");

      cy.get("svg[icon=leftArrow]").should("exist");
      cy.get("svg[icon=rightArrow]").should("not.exist");
    });

    it("renders both scroll indicators when tabs are hidden on the left and right", () => {
      cy.get(".tab-container").scrollTo(50);

      cy.get("svg[icon=leftArrow]").should("not.exist");
      cy.get("svg[icon=rightArrow]").should("exist");
    });
  });

  describe("with input and persistent content", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--with-inputs");
    });
    it("persists input values of tab when hidden", () => {
      cy.get(".Tab1").click();

      cy.get(".Input1").type("value");
      cy.get(".Tab2").click();

      cy.get(".Input2").should("have.value", "");

      cy.get(".Tab1").click();

      cy.get(".Input1").should("have.value", "value");
    });
  });

  describe("render tab content on selection", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--with-content-loaded-on-selection");
    });
    it("does not persists input values of tab when hidden if 'renderTabContentOnlyWhenSelected = true'", () => {
      cy.get(".Tab1").click();

      cy.get(".Input1").type("value");

      cy.get(".Tab2").click();

      cy.get(".Input2").should("have.value", "");

      cy.get(".Tab1").click();

      cy.get(".Input1").should("have.value", "");
    });
  });

  describe("with state", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--controlled");
    });
    it("shows the content for each tab on click", () => {
      cy.get(".Tab1").click();

      cy.get("[aria-hidden=false]").should(
        "have.text",
        "Uncontrolled Content: Tab 1"
      );
      cy.get(".ControlledTabContent").should(
        "have.text",
        "Controlled Content: Tab 1"
      );

      cy.get(".Tab2").click();

      cy.get("[aria-hidden=false]").should(
        "have.text",
        "Uncontrolled Content: Tab 2"
      );
      cy.get(".ControlledTabContent").should(
        "have.text",
        "Controlled Content: Tab 2"
      );
    });
  });
});
