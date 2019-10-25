describe("Table", () => {
  const headerCheckboxSelector = "th div[class*='Checkbox__VisualCheckbox']";
  const headerCheckboxInputSelector = "th input[type='checkbox']";
  const rowCheckboxSelector = "tbody div[class*='Checkbox__VisualCheckbox']";
  const rowCheckboxInputSelector = "tbody input[type='checkbox']";

  const paginationButtonSelector =
    "button[class*='Pagination__PaginationButton']";
  const selectAll = () => cy.get(headerCheckboxSelector);
  const selectAllInput = () => cy.get(headerCheckboxInputSelector);
  const rowCheckboxes = () => cy.get(rowCheckboxSelector);
  const rowCheckboxesInput = () => cy.get(rowCheckboxInputSelector);
  const paginationButtons = () => cy.get(paginationButtonSelector);

  describe("table--with-preselected-rows", () => {
    it("toggles the value of the header checkbox on click", () => {
      cy.renderFromStorybook("table--with-preselected-rows");

      selectAll().click();
      selectAllInput().should("be.checked");
    });

    it("selects a row on click", () => {
      cy.renderFromStorybook("table--with-preselected-rows");

      rowCheckboxes()
        .first()
        .click();

      rowCheckboxesInput()
        .first()
        .should("be.checked");
    });

    describe("Select All Checkbox", () => {
      it("selects all rows when there are unselected rows", () => {
        cy.renderFromStorybook("table--with-preselected-rows");

        selectAll().click();

        selectAllInput().should("be.checked");
        rowCheckboxesInput().should("be.checked");
      });

      it("deselect all rows when all rows are selected", () => {
        cy.renderFromStorybook("table--with-preselected-rows");

        selectAll()
          .click()
          .click();

        selectAllInput().should("not.be.checked");
      });
      it("becomes selected if all rows are selected", () => {
        cy.renderFromStorybook("table--with-preselected-rows");

        rowCheckboxes()
          .first()
          .click();

        selectAllInput().should("be.checked");
      });
      it("becomes unselected if not all rows are selected", () => {
        cy.renderFromStorybook("table--with-preselected-rows");

        cy.renderFromStorybook("table--with-preselected-rows");

        selectAll().click();

        selectAllInput().should("be.checked");
        rowCheckboxesInput().should("be.checked");

        rowCheckboxes()
          .first()
          .click();

        rowCheckboxesInput()
          .first()
          .should("not.be.checked");
        rowCheckboxesInput()
          .last()
          .should("be.checked");
        selectAllInput().should("not.be.checked");
      });
    });
  });
  describe("table--with-pagination", () => {
    it("navigates to next page when next button is clicked", () => {
      cy.renderFromStorybook("table--with-pagination");

      paginationButtons()
        .last()
        .click();

      cy.get("tbody").should("contain", "some data 4");
    });
    it("navigates to previous page when previous button is clicked", () => {
      cy.renderFromStorybook("table--with-pagination");

      paginationButtons()
        .last()
        .click();
      cy.get("tbody").should("contain", "some data 4");
      paginationButtons()
        .first()
        .click();

      cy.get("tbody").should("contain", "some data 0");
      paginationButtons().should("be.disabled");
    });
    it("navigates to specific page when a page button is clicked", () => {
      cy.renderFromStorybook("table--with-pagination");

      paginationButtons()
        .eq(5)
        .click();

      cy.get("tbody").should("contain", "some data 1");
      paginationButtons()
        .eq(5)
        .should("be.disabled");
    });
    it("disables next button when on last page", () => {
      cy.renderFromStorybook("table--with-pagination");

      paginationButtons()
        .eq(-2)
        .click();

      cy.get("tbody").should("contain", "some data 20");
      paginationButtons()
        .eq(-2)
        .should("be.disabled");
      paginationButtons()
        .last()
        .should("be.disabled");
    });
  });
  describe("table--with-pagination-and-selectable-rows", () => {
    it("saves selections on between pages", () => {
      cy.renderFromStorybook("table--with-pagination-and-selectable-rows");

      selectAll().click();

      selectAllInput().should("be.checked");
      rowCheckboxesInput().should("be.checked");

      paginationButtons()
        .last()
        .click();
      selectAll().click();
      selectAll().click();

      cy.get("tbody").should("contain", "some data 5");
      selectAllInput().should("not.be.checked");
      rowCheckboxesInput().should("not.be.checked");

      paginationButtons()
        .first()
        .click();

      selectAllInput().should("be.checked");
      rowCheckboxesInput().should("be.checked");
    });
  });
});
