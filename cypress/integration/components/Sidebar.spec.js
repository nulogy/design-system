const Sidebar = () => cy.get('[role="complementary"]');
const trigger = () => cy.contains("Toggle Sidebar");

describe("Sidebar", () => {
  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("layout--with-side-bar");
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
      trigger().click();
      Sidebar().should("not.be.visible");
    });
  });
  describe("Accessibility", () => {
    beforeEach(() => {
      cy.renderFromStorybook("layout--with-side-bar");
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
      cy.renderFromStorybook("layout--with-side-bar-open-by-default");
    });
    it("is shown", () => {
      Sidebar().should("be.visible");
    });
    it("slides out when triggered", () => {
      trigger().click();
      Sidebar().should("not.be.visible");
    });
    it("slides in", () => {
      trigger().click();
      trigger().click();
      Sidebar().should("be.visible");
    });
  });
  describe("Custom offset", () => {
    beforeEach(() => {
      cy.renderFromStorybook("layout--with-side-bar-custom-offset");
    });
    it("is shown", () => {
      Sidebar().should("be.visible");
      Sidebar().should("have.css", "right", "400px");
    });
    it("slides out when triggered", () => {
      trigger().click();
      Sidebar().should("not.be.visible");
      Sidebar().should("have.css", "right", "0px");
    });
    it("updates offset", () => {
    cy.changeKnob("offset", "35px");
      Sidebar().should("have.css", "right", "35px");
    });
  });
});
