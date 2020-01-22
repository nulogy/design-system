describe("Table", () => {
  const headerCheckboxSelector = "th div[class*='Checkbox__VisualCheckbox']";
  const headerCheckboxInputSelector = "th input[type='checkbox']";
  const rowCheckboxSelector = "tbody div[class*='Checkbox__VisualCheckbox']";
  const rowCheckboxInputSelector = "tbody input[type='checkbox']";
  const rowExpandButtonSelector = "tbody svg[icon*='downArrow']";
  const rowCollapseButtonSelector = "tbody svg[icon*='upArrow']";

  const paginationButtonSelector =
    "button[class*='Pagination__PaginationButton']";
  const selectAll = () => cy.get(headerCheckboxSelector);
  const selectAllInput = () => cy.get(headerCheckboxInputSelector);
  const rowCheckboxes = () => cy.get(rowCheckboxSelector);
  const rowCheckboxesInput = () => cy.get(rowCheckboxInputSelector);
  const paginationButtons = () => cy.get(paginationButtonSelector);
  const expandButtons = () => cy.get(rowExpandButtonSelector);
  const collapseButtons = () => cy.get(rowCollapseButtonSelector);

  const selectableRowsTests = storyName => {
    beforeEach(() => {
      cy.renderFromStorybook(`storiesfortests-${storyName}`);
    });
    it("toggles the value of the header checkbox on click", () => {
      selectAll().click();
      selectAllInput().should("be.checked");
    });

    it("selects a row on click", () => {
      rowCheckboxes()
        .first()
        .click();

      rowCheckboxesInput()
        .first()
        .should("be.checked");
    });

    describe("Select All Checkbox", () => {
      it("selects all rows when there are unselected rows", () => {
        selectAll().click();

        selectAllInput().should("be.checked");
        rowCheckboxesInput().should("be.checked");
      });

      it("deselect all rows when all rows are selected", () => {
        selectAll().click();
        selectAll().click();

        selectAllInput().should("not.be.checked");
      });
      it("becomes selected if all rows are selected", () => {
        rowCheckboxes()
          .first()
          .click();

        selectAllInput().should("be.checked");
      });
      it("becomes unselected if not all rows are selected", () => {
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
  };

  describe("table--with-selected-rows-with-defaults", () => {
    selectableRowsTests("table--with-selected-rows-with-defaults");
  });
  describe("table--with-pagination", () => {
    it("navigates to next page when next button is clicked", () => {
      cy.renderFromStorybook("storiesfortests-table--with-pagination");

      paginationButtons()
        .last()
        .click();

      cy.get("tbody").should("contain", "some data 4");
    });
    it("navigates to previous page when previous button is clicked", () => {
      cy.renderFromStorybook("storiesfortests-table--with-pagination");

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
      cy.renderFromStorybook("storiesfortests-table--with-pagination");

      paginationButtons()
        .eq(5)
        .click();

      cy.get("tbody").should("contain", "some data 1");
      paginationButtons()
        .eq(5)
        .should("be.disabled");
    });
    it("disables next button when on last page", () => {
      cy.renderFromStorybook("storiesfortests-table--with-pagination");

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
      cy.renderFromStorybook(
        "storiesfortests-table--with-pagination-and-selectable-rows"
      );

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
  describe("table--with-expandable-and-selectable-rows-with-defaults", () => {
    selectableRowsTests(
      "table--with-expandable-and-selectable-rows-with-defaults"
    );
    it("collapses the row when expanded", () => {
      expandButtons().should("not.exist");
      collapseButtons().click();
      expandButtons().should("exist");
      cy.get("tbody").should("not.contain", "Expands!");
    });
    it("expands the row when collapsed", () => {
      collapseButtons().click();
      expandButtons().should("exist");
      expandButtons().click();
      collapseButtons().should("exist");
      expandButtons().should("not.exist");
      cy.get("tbody").should("contain", "Expands!");
    });
  });
});
