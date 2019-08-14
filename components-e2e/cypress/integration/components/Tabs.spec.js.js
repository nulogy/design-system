describe("Tabs", () => {
  //behavior tests
  it("renders tab components", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").should("have.text", "Tab 1");
  });

  it("selects the tab that is clicked", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1")
      .should("have.attr", "aria-selected", "false")
      .click()
      .should("have.attr", "aria-selected", "true");
  });

  it("moves focus to the tab that is clicked", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").click();

    cy.focused().should("have.text", "Tab 1");
  });

  it("opens tab content when the tab is clicked", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").click();

    cy.get(".TabContent[aria-hidden=false]").should(
      "have.text",
      "Tab 1 Content"
    );
  });

  //focus
  it("focuses the first tab by default", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get("button[tabindex=0]").focus();

    cy.focused().should("have.text", "Tab 1");
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

  //indicators tests
  it("scrolls to last visible Tab to left on right indicator click", () => {
    cy.renderFromStorybook("tabs--with-scrolling");

    cy.get("svg[icon=rightArrow]").click();
    cy.get(".TabContainer").should("have.prop", "scrollLeft", 48);
  });

  it("scrolls to first visible Tab to right on left indicator click", () => {
    cy.renderFromStorybook("tabs--with-scrolling");

    cy.get(".TabContainer").scrollTo("right");

    cy.get("svg[icon=leftArrow]").click();
    cy.get(".TabContainer").should("have.prop", "scrollLeft", 279);
  });

  it("scrolls to end on right indicator click when near the end of the container", () => {
    const containerWidth = 327;

    cy.renderFromStorybook("tabs--with-scrolling");

    cy.get(".TabContainer").scrollTo(containerWidth - 10);

    cy.get("svg[icon=rightArrow]").click();
    cy.get(".TabContainer").should("have.prop", "scrollLeft", containerWidth);
  });

  it("scrolls to start on left indicator click when near the start of the container", () => {
    cy.renderFromStorybook("tabs--with-scrolling");

    cy.get(".TabContainer").scrollTo(10);

    cy.get("svg[icon=leftArrow]").click();
    cy.get(".TabContainer").should("have.prop", "scrollLeft", 0);
  });

  //persistance tests
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
});
