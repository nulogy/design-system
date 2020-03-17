describe("TruncatedText", () => {
  const assertNoTooltip = () => cy.get('[role="tooltip"]').should("not.exist");
  const assertText = text => {
    cy.get("p").should("be.visible");
    cy.get("p").contains(text);
  };
  const assertTooltip = text => {
    cy.get('[aria-haspopup="true"]').trigger("mouseover");
    cy.get('[role="tooltip"]').should("be.visible");
    cy.isInViewport('[role="tooltip"]');
    cy.get('[role="tooltip"]').contains(text);
  };
  describe("default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--truncatedtext");
    });
    it("shows the truncated text", () => {
      assertText("Special instructions...");
    });
    it("shows a tooltip with full content on hover", () => {
      assertTooltip("Special instructions are provided for the shipment");
    });
  });
  describe("without tooltip", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--without-tooltip");
    });
    it("shows the truncated text", () => {
      assertText("Special instructions...");
    });
    it("does not show a tooltip", () => {
      assertNoTooltip();
    });
  });
  describe("under max characters", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--under-max-characters");
    });
    it("shows the full text", () => {
      assertText("Item is available");
    });
    it("does not show a tooltip", () => {
      assertNoTooltip();
    });
  });
  describe("with max characters 10", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--with-max-characters-10");
    });
    it("shows the truncated text", () => {
      assertText("Item is av...");
    });
    it("does not show a tooltip", () => {
      assertNoTooltip();
    });
  });
  describe("default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--with-custom-truncation-indicator");
    });
    it("shows the truncated text", () => {
      assertText("Special instructions + 2...");
    });
    it("shows a tooltip with full content on hover", () => {
      assertTooltip("Special instructions are provided for the shipment");
    });
  });
});
