describe("Tabs", () => {
  it("renders tab components", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").should("have.text", "Tab 1");
  });

  it("selects the tab on click", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1")
      .should("have.attr", "aria-selected", "false")
      .click()
      .should("have.attr", "aria-selected", "true");
  });

  it("moves focus to the tab on click", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").click();

    cy.focused().should("have.text", "Tab 1");
  });

  it("displays the tab content on click", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").click();

    cy.get("[aria-hidden=false]").should("have.text", "Tab 1 Content");
  });

  it("selects a tab when enter is pressed on it", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1")
      .type("{enter}")
      .should("have.attr", "aria-selected", "true");
  });

  it("focuses the first tab by default", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get("button[tabindex=0]").focus();

    cy.focused().should("have.text", "Tab 1");
  });

  it("will remember the last tab that was focused when focus leaves and then returns", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get("button[tabindex=0]").type("{rightarrow}");

    cy.focused().should("have.text", "Tab 2");

    cy.focused().blur();

    cy.focused().should("not.exist");

    cy.get("button[tabindex=0]").should("have.text", "Tab 2");
  });

  it("moves to the next tab when right arrow key is pressed", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").type("{rightarrow}");

    cy.focused().should("have.text", "Tab 2");
  });

  it("moves to the previous tab whenleft arrow key is pressed", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab2").type("{leftarrow}");

    cy.focused().should("have.text", "Tab 1");
  });

  it("moves to the first tab when right arrow key is pressed on last tab", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab4").type("{rightarrow}");

    cy.focused().should("have.text", "Tab 1");
  });

  it("moves to the last tab when left arrow key is pressed on first tab", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").type("{leftarrow}");

    cy.focused().should("have.text", "Tab 4");
  });

  it("only renders right scroll indicator when tabs are hidden on the right", () => {
    cy.renderFromStorybook("tabs--with-scrolling");

    cy.get("svg[icon=leftArrow]").should("not.exist");
    cy.get("svg[icon=rightArrow]").should("exist");
  });

  it("only renders left scroll indicator when tabs are hidden on the left", () => {
    cy.renderFromStorybook("tabs--with-scrolling");

    cy.get(".TabContainer").scrollTo("right");

    cy.get("svg[icon=leftArrow]").should("exist");
    cy.get("svg[icon=rightArrow]").should("not.exist");
  });

  it("renders both scroll indicators when tabs are hidden on the left and right", () => {
    cy.renderFromStorybook("tabs--with-scrolling");

    cy.get(".TabContainer").scrollTo(50);

    cy.get("svg[icon=leftArrow]").should("not.exist");
    cy.get("svg[icon=rightArrow]").should("exist");
  });

  it("persists input values of tab when hidden", () => {
    cy.renderFromStorybook("tabs--with-input-and-persistant-content");

    cy.get(".Tab1").click();

    cy.get(".Input1").type("value");

    cy.get(".Tab2").click();

    cy.get(".Input2").should("have.value", "");

    cy.get(".Tab1").click();

    cy.get(".Input1").should("have.value", "value");
  });

  it("does not persists input values of tab when hidden if 'renderTabContentOnlyWhenSelected = true'", () => {
    cy.renderFromStorybook("tabs--with-input-and-not-persistant-content");

    cy.get(".Tab1").click();

    cy.get(".Input1").type("value");

    cy.get(".Tab2").click();

    cy.get(".Input2").should("have.value", "");

    cy.get(".Tab1").click();

    cy.get(".Input1").should("have.value", "");
  });

  it("is controllable", () => {
    cy.renderFromStorybook("tabs--controlled");

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
