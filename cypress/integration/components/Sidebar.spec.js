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
      overlay().click({force: true});
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
      overlay().click({force: true});
      Sidebar().should("not.be.visible");
    });
    it("slides out when close button clicked", () => {
      closeButton().click({force: true});
      Sidebar().should("not.be.visible");
    });
    it("slides in", () => {
      overlay().click({force: true});
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
      overlay().click({force: true});
      Sidebar().should("not.be.visible");
      Sidebar().should("have.css", "right", "0px");
    });
    it("updates offset", () => {
    cy.changeKnob("offset", "35px");
      Sidebar().should("have.css", "right", "35px");
    });
  });
  describe("Without overlay", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--without-overlay");
    });
    it("slides out when clicking on the body", () => {
      trigger().click();
      Sidebar().should("be.visible");
      cy.get("body").click();
      Sidebar().should("not.be.visible");
      Sidebar().should("have.css", "right", "0px");
    });
  });
  describe("Don't close on outide click", () => {
    beforeEach(() => {
      cy.renderFromStorybook("sidebar--dont-close-on-outside-click");
    });
    it("does not close when clicking on the body", () => {
      trigger().click();
      Sidebar().should("be.visible");
      cy.get("body").click();
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
});
