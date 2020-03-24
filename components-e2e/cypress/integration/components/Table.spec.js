describe("Table", () => {
  const headerCheckboxSelector = "th [data-testid='visual-checkbox']";
  const headerCheckboxInputSelector = "th [type='checkbox']";
  const rowCheckboxSelector = "tbody [data-testid='visual-checkbox']";
  const rowCheckboxInputSelector = "tbody [type='checkbox']";
  const rowExpandButtonSelector = "tbody [aria-label='Expand row']";
  const rowCollapseButtonSelector = "tbody [aria-label='Collapse row']";
  const getNextPageButton = () => cy.get("[aria-label='Go to next results']");
  const getPreviousPageButton = () =>
    cy.get("[aria-label='Go to previous results']");
  const selectAll = () => cy.get(headerCheckboxSelector);
  const selectAllInput = () => cy.get(headerCheckboxInputSelector);
  const rowCheckboxes = () => cy.get(rowCheckboxSelector);
  const rowCheckboxesInput = () => cy.get(rowCheckboxInputSelector);
  const paginationButtons = pageNumber =>
    cy.get(`[aria-label='Go to page ${pageNumber}']`);
  const expandButtons = () => cy.get(rowExpandButtonSelector);
  const collapseButtons = () => cy.get(rowCollapseButtonSelector);

  const selectableRowsTests = storyName => {
    beforeEach(() => {
      cy.renderFromStorybook(storyName);
    });
    it("toggles the value of the header checkbox on click", () => {
      selectAll().click();
      selectAllInput().should("be.checked");
    });

    it("selects a row on click", () => {
      rowCheckboxes()
        .eq(1)
        .click();

      rowCheckboxesInput()
        .eq(1)
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
        rowCheckboxes().each($el => {
          cy.wrap($el).click();
        });

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
    selectableRowsTests("table-with-selectable-rows--with-selectable-rows");
  });
  describe("pagination", () => {
    beforeEach(() => {
      cy.renderFromStorybook("table--with-pagination");
    });
    it("navigates to next page when next button is clicked", () => {
      getNextPageButton().click();

      cy.get("tbody").should("contain", "2019-10-02");
    });
    it("navigates to previous page when previous button is clicked", () => {
      getNextPageButton().click();
      cy.get("tbody").should("contain", "2019-10-02");
      getPreviousPageButton().click();

      cy.get("tbody").should("contain", "2019-10-01");
      getPreviousPageButton().should("be.disabled");
    });
    it("navigates to specific page when a page button is clicked", () => {
      paginationButtons(5).click();

      cy.get("tbody").should("contain", "2019-10-07");
      paginationButtons(4)
        .next()
        .should("be.disabled");
    });
    it("disables next button when on last page", () => {
      paginationButtons(8).click();

      cy.get("tbody").should("contain", "2019-10-24");
      paginationButtons(7)
        .next()
        .should("be.disabled");
      getNextPageButton().should("be.disabled");
    });
  });
  describe("selections with pagination", () => {
    beforeEach(() => {
      cy.renderFromStorybook("table--with-everything");
    });
    it("saves selections on between pages", () => {
      selectAll().click();

      selectAllInput().should("be.checked");
      rowCheckboxesInput().should("be.checked");

      getNextPageButton().click();
      selectAll().click();
      selectAll().click();

      cy.get("tbody").should("contain", "Thu, 24 Oct 2019");
      selectAllInput().should("not.be.checked");
      rowCheckboxesInput().should("not.be.checked");

      getPreviousPageButton().click();

      selectAllInput().should("be.checked");
      rowCheckboxesInput().should("be.checked");
    });
  });
  describe("expanding rows", () => {
    beforeEach(() => {
      cy.renderFromStorybook("table--with-everything");
    });
    it("collapses the row when expanded", () => {
      collapseButtons().should("not.exist");
      expandButtons().should("exist");
      expandButtons().click();
      collapseButtons().should("exist");
      collapseButtons().click();
      cy.get("tbody").should("not.contain", "Expands!");
    });
    it("expands the row when collapsed", () => {
      collapseButtons().should("not.exist");
      expandButtons().should("exist");
      expandButtons().click();
      cy.get("tbody").should("contain", "Expands!");
    });
  });
});
