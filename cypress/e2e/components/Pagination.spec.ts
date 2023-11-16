describe("Pagination", () => {
  describe("with scrolling", () => {
    beforeEach(() => {
      cy.renderFromStorybook("pagination--scroll-after-pagination");
    });

    it("does not scroll after pagination by default", () => {
      cy.get('[aria-label="scroll target"]').contains("None").click();

      cy.get('[aria-label="Pagination navigation"]').contains("Next").click();
      cy.isNotInViewport('[data-testid="page-heading"');
    });

    it("scrolls to the top of the page after pagination when scrollToTopAfterPagination is true", () => {
      cy.get('[aria-label="scroll target"]').contains("Top of page").click();

      cy.get('[aria-label="Pagination navigation"]').contains("Next").click();
      cy.get('[aria-label="Pagination navigation"]').contains("Previous").click();
      cy.isInViewport('[data-testid="page-heading"');
    });

    it("scrolls to the top of the target element when scrollToTopAfterPagination is true and a scrollTargetRef is present", () => {
      cy.get('[aria-label="scroll target"]').contains("Top of section").click();

      cy.get('[aria-label="Pagination navigation"]').contains("7").click();
      cy.isNotInViewport('[data-testid="page-heading"');
      cy.isInViewport('[data-testid="section-heading"');
    });
  });
});
