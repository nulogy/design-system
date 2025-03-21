describe("TruncatedText", () => {
  const triggerSelector = '[data-testid="truncated-text"]';
  const assertText = (text, el = "p") => {
    cy.get(el).should("be.visible").contains(text);
  };

  describe("default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--truncated-text");
    });
    it("shows the truncated text", () => {
      assertText("Special instructions...");
    });
    it("shows a tooltip with full content on hover", () => {
      cy.assertTooltip(triggerSelector, "Special instructions are provided for the shipment");
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
      cy.assertNoTooltip(triggerSelector);
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
      cy.assertNoTooltip(triggerSelector);
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
      cy.assertNoTooltip(triggerSelector);
    });
  });

  describe("with custom truncation indicator", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--with-custom-truncation-indicator");
    });
    it("shows the truncated text", () => {
      assertText("Special instructions + 2...");
    });
    it("shows a tooltip with full content on hover", () => {
      cy.assertTooltip(triggerSelector, "Special instructions are provided for the shipment");
    });
  });

  describe("as title", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--as-title");
    });
    it("shows the truncated text", () => {
      assertText("Special instructions...", "h1");
    });
  });

  describe("with fullWidth setting", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--full-width");
    });
    it("shows the tooltip when there is overflow", () => {
      cy.get(triggerSelector)
        .first()
        .should("have.attr", "aria-describedby")
        .then((tooltipId) => {
          cy.get(`#${tooltipId}`)
            .should("exist")
            .should("have.css", "visibility", "visible")
            .and("have.css", "opacity", "1")
            .contains("Special instructions are truncated because there is not enough space to show them.");
        });
    });
    it("doesn't show a tooltip when there's no overflow", () => {
      cy.get(triggerSelector).eq(1).realHover();
      cy.get(triggerSelector).eq(1).should("not.have.attr", "aria-describedby");
      cy.get(triggerSelector).eq(1).contains("Instructions fit here.");
    });
  });

  describe("without children", () => {
    beforeEach(() => {
      cy.renderFromStorybook("truncatedtext--without-children");
    });
    it("renders without crashing", () => {
      cy.get(triggerSelector).should("exist");
    });
  });
});
