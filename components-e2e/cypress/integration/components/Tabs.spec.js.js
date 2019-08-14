describe("Tabs", () => {
  it("renders", () => {
    cy.renderFromStorybook("tabs--base");
    cy.get("[role='tablist']").should("have.text", "Tab 1Tab 2Tab 3Tab 4");
  });
});
