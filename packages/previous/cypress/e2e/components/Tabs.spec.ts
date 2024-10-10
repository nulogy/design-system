describe("Tabs", () => {
  const getTab = (tabNumber) => cy.contains(`Tab ${tabNumber}`);
  describe("default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--tabs");
    });
    it("renders tab components", () => {
      getTab(1).should("have.text", "Tab 1");
    });

    it("selects the tab on click", () => {
      getTab(1).should("have.attr", "aria-selected", "false").click().should("have.attr", "aria-selected", "true");
    });

    it("moves focus to the tab on click", () => {
      getTab(1).click();

      cy.focused().should("have.text", "Tab 1");
    });

    it("displays the tab content on click", () => {
      getTab(1).click();

      cy.get("[aria-hidden=false]").should("have.text", "Tab 1 Content");
    });

    it("selects a tab when enter is pressed on it", () => {
      getTab(1).type("{enter}");

      getTab(1).should("have.attr", "aria-selected", "true");
      cy.get("[aria-hidden=false]").should("have.text", "Tab 1 Content");
    });

    it("focuses the first tab by default", () => {
      getTab(1).focus();

      cy.focused().should("have.text", "Tab 1");
    });

    it("will remember the last tab that was focused when focus leaves and then returns", () => {
      getTab(1).type("{rightarrow}");

      cy.focused().should("have.text", "Tab 2");

      cy.focused().blur();

      cy.focused().should("not.exist");

      getTab(2).should("have.text", "Tab 2");
    });

    it("moves to the next tab when right arrow key is pressed", () => {
      getTab(1).type("{rightarrow}");

      cy.focused().should("have.text", "Tab 2");
    });

    it("moves to the previous tab whenleft arrow key is pressed", () => {
      getTab(2).type("{leftarrow}");

      cy.focused().should("have.text", "Tab 1");
    });

    it("moves to the first tab when right arrow key is pressed on last tab", () => {
      getTab(4).type("{rightarrow}");

      cy.focused().should("have.text", "Tab 1");
    });

    it("moves to the last tab when left arrow key is pressed on first tab", () => {
      getTab(1).type("{leftarrow}");

      cy.focused().should("have.text", "Tab 4");
    });
  });

  describe("with scrolling", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--with-scrolling-tabs");
    });
    it("only renders right scroll indicator when tabs are hidden on the right", () => {
      cy.get("svg.nds-icon--leftArrow").should("not.exist");
      cy.get("svg.nds-icon--rightArrow").should("exist");
    });

    it("only renders left scroll indicator when tabs are hidden on the left", () => {
      cy.get(".tab-container").scrollTo("right");

      cy.get("svg.nds-icon--leftArrow").should("exist");
      cy.get("svg.nds-icon--rightArrow").should("not.exist");
    });

    it("renders both scroll indicators when tabs are hidden on the left and right", () => {
      cy.get(".tab-container").scrollTo(50, 0);

      cy.get("svg.nds-icon--leftArrow").should("not.exist");
      cy.get("svg.nds-icon--rightArrow").should("exist");
    });
  });

  describe("with input and persistent content", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--with-inputs");
    });
    it("persists input values of tab when hidden", () => {
      getTab(1).click();

      cy.get(".Input1").type("value");
      getTab(2).click();

      cy.get(".Input2").should("have.value", "");

      getTab(1).click();

      cy.get(".Input1").should("have.value", "value");
    });
  });

  describe("render tab content on selection", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--with-content-loaded-on-selection");
    });
    it("does not persists input values of tab when hidden if 'renderTabContentOnlyWhenSelected = true'", () => {
      getTab(1).click();

      cy.get(".Input1").type("value");

      getTab(2).click();

      cy.get(".Input2").should("have.value", "");

      getTab(1).click();

      cy.get(".Input1").should("have.value", "");
    });
  });

  describe("with state", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--controlled");
    });
    it("shows the content for each tab on click", () => {
      getTab(1).click();

      cy.get("[aria-hidden=false]").should("have.text", "Uncontrolled Content: Tab 1");
      cy.get(".ControlledTabContent").should("have.text", "Controlled Content: Tab 1");

      getTab(2).click();

      cy.get("[aria-hidden=false]").should("have.text", "Uncontrolled Content: Tab 2");
      cy.get(".ControlledTabContent").should("have.text", "Controlled Content: Tab 2");
    });
  });

  describe("with default tab selection", () => {
    beforeEach(() => {
      cy.renderFromStorybook("tabs--with-other-interactive-elements");
    });
    it("focuses on the default selected tab", () => {
      cy.get("button").contains("Click me").tab();
      cy.focused().should("have.text", "Tab 2");
    });
  });
});
