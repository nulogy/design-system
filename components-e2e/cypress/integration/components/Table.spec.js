describe("Table", () => {
  const headerCheckboxSelector = "th div[class*='Checkbox__VisualCheckbox']";
  const headerCheckboxInputSelector = "th input[type='checkbox']";
  const rowCheckboxSelector = "tbody div[class*='Checkbox__VisualCheckbox']";
  const rowCheckboxInputSelector = "th input[type='checkbox']";
  it("toggles the value of the header checkbox on click", () => {
    cy.renderFromStorybook("table--with-preselected-rows");

    cy.get(headerCheckboxSelector).click();
    cy.get(headerCheckboxInputSelector).should("be.checked");
  });

  it("selects a row on click", () => {
    cy.renderFromStorybook("table--with-preselected-rows");

    cy.get(rowCheckboxSelector)
      .first()
      .click();
    cy.get(rowCheckboxInputSelector)
      .first()
      .should("be.checked");
  });

  describe("Select All Checkbox", () => {
    it("selects all rows when there are unselected rows", () => {
      cy.renderFromStorybook("table--with-preselected-rows");

      cy.get(headerCheckboxSelector).click();
      cy.get(headerCheckboxInputSelector).should("be.checked");
      cy.get(rowCheckboxInputSelector).should("be.checked");
    });

    it("deselect all rows when all rows are selected", () => {
      cy.renderFromStorybook("table--with-preselected-rows");

      cy.get(headerCheckboxSelector)
        .click()
        .click();
      cy.get(headerCheckboxInputSelector).should("not.be.checked");
    });
    it("becomes selected if all rows are selected", () => {
      cy.renderFromStorybook("table--with-preselected-rows");

      cy.get(rowCheckboxSelector)
        .first()
        .click();
      cy.get(headerCheckboxInputSelector).should("be.checked");
    });
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
