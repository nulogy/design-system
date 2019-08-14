describe("Tabs", () => {
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
});
