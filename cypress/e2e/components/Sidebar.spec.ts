const Sidebar = () => cy.get('[role="dialog"]');
const trigger = () => cy.contains("Open Sidebar");
const overlay = () => cy.get('[data-testid="sidebar-overlay"]');
const closeButton = () => cy.get('[data-testid="sidebar-close-button"]');

describe("Sidebar", () => {
  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--sidebar");
    });

    it("is hidden", () => {
      Sidebar().should("not.be.visible");
    });

    it("slides in when triggered", () => {
      trigger().click();
      Sidebar().should("be.visible");
    });

    it("slides out", () => {
      trigger().click();
      overlay().should("be.visible");
      overlay().click({ force: true });
      Sidebar().should("not.be.visible");
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--sidebar");
    });

    it("focuses the close button when opened", () => {
      trigger().click();
      cy.focused().type("{enter}");
      Sidebar().should("not.be.visible");
    });

    it("focuses the trigger when closed", () => {
      trigger().click();
      cy.focused().type("{enter}");
      Sidebar().should("not.be.visible");
      cy.focused().type("{enter}");
      Sidebar().should("be.visible");
    });
  });

  describe("Open by default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--open-by-default");
    });

    it("is shown", () => {
      Sidebar().should("be.visible");
    });

    it("slides out when overlay clicked", () => {
      overlay().click({ force: true });
      Sidebar().should("not.be.visible");
    });

    it("slides out when close button clicked", () => {
      closeButton().click({ force: true });
      Sidebar().should("not.be.visible");
    });

    it("slides in", () => {
      overlay().click({ force: true });
      trigger().click();
      Sidebar().should("be.visible");
    });
  });

  describe("Custom offset", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--with-custom-offset");
    });
    it("is shown", () => {
      Sidebar().should("be.visible");
      Sidebar().should("have.css", "right", "400px");
    });
    it("slides out when close button clicked", () => {
      closeButton().click();
      Sidebar().should("not.be.visible");
      Sidebar().should("have.css", "right", "0px");
    });
    it("slides out when overlay clicked", () => {
      overlay().click({ force: true });
      Sidebar().should("not.be.visible");
      Sidebar().should("have.css", "right", "0px");
    });
  });
  describe("Without overlay", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--without-overlay");
    });
    it("slides out when clicking on the body", () => {
      trigger().click();
      Sidebar().should("be.visible");
      overlay().click({ force: true });
      Sidebar().should("not.be.visible");
      Sidebar().should("have.css", "right", "0px");
    });
  });
  describe("Don't close on outside click", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--dont-close-on-outside-click");
    });
    it("does not close when clicking on the body", () => {
      trigger().click();
      Sidebar().should("be.visible");
      cy.get("body").click({ force: true });
      Sidebar().should("be.visible");
    });
    it("closes when the close button is pressed", () => {
      trigger().click();
      Sidebar().should("be.visible");
      closeButton().click();
      Sidebar().should("not.be.visible");
      Sidebar().should("have.css", "right", "0px");
    });
  });

  describe("Scroll Lock", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--sidebar");
    });

    it("locks body scroll when sidebar is open", () => {
      cy.get("body").should("not.have.css", "overflow", "hidden");

      trigger().click();

      cy.get("body").should("have.css", "overflow", "hidden");
    });

    it("unlocks body scroll when sidebar is closed", () => {
      trigger().click();

      closeButton().click();

      cy.get("body").should("not.have.css", "overflow", "hidden");
    });

    it("respects disableScroll prop when set to false", () => {
      cy.renderFromStorybook("sidebar--sidebar", {
        disableScroll: false,
      });

      trigger().click();

      cy.get("body").should("not.have.css", "overflow", "hidden");
    });

    it("respects overlay prop when set to false", () => {
      cy.renderFromStorybook("sidebar--without-overlay");

      trigger().click();

      cy.get("body").should("not.have.css", "overflow", "hidden");
    });

    it("maintains scroll lock when closing and reopening quickly", () => {
      trigger().click();

      cy.get("body").should("have.css", "overflow", "hidden");

      closeButton().click();
      trigger().click();

      cy.get("body").should("have.css", "overflow", "hidden");
    });
  });
});
