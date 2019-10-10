describe("Table", () => {
  const selectAllCheckbox = () => cy.get("th input[type='checkbox']");
  it("toggles the value of the header checkbox on click", () => {
    cy.renderFromStorybook("table--with-preselected-rows");
    cy.get("th input[type='checkbox']").click();
    selectAllCheckbox().should("be.checked");
  });

  it("selects a row on click", () => {
    cy.renderFromStorybook("table--with-preselected-rows");
    cy.get("tbody input[type='checkbox']")
      .first()
      .click();
    cy.get("tbody input[type='checkbox']")
      .first()
      .should("be.checked");
  });

  it("selects a row on click", () => {
    cy.renderFromStorybook("table--with-preselected-rows");
    cy.get("th input[type='checkbox']").click();
    selectAllCheckbox().should("be.checked");
    cy.get("tbody input[type='checkbox']").should("be.checked");
    cy.get("th input[type='checkbox']").click();
    selectAllCheckbox().should("not.be.checked");
  });
});
