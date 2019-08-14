describe("Tabs", () => {
  it("renders tab components", () => {
    cy.renderFromStorybook("tabs--base");

    cy.get(".Tab1").should("have.text", "Tab 1");
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
