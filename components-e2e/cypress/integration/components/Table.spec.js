describe("Table", () => {
  const selectAllCheckbox = () => cy.get("th input[type='checkbox']");
  it("toggles the value of the header checkbox on click", () => {
    cy.renderFromStorybook("table--with-preselected-rows");
    cy.get("th input[type='checkbox']").click();
    selectAllCheckbox().should("be.checked");
  });
});
