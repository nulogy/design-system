const sideBar = () => cy.get('[role="complementary"]');
const trigger = () => cy.contains("Toggle SideBar");

describe("SideBar", () => {
  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("layout--with-side-bar");
    });
    it("is hidden", () => {
      sideBar().should("not.be.visible");
    });
    it("slides in when triggered", () => {
      trigger().click();
      sideBar().should("be.visible");
    });
    it("slides out", () => {
      trigger().click();
      trigger().click();
      sideBar().should("not.be.visible");
    });
  });
  describe("Accessibility", () => {
    beforeEach(() => {
      cy.renderFromStorybook("layout--with-side-bar");
    });
    it("focuses the close button when opened", () => {
      trigger().click();
      cy.focused().type("{enter}");
      sideBar().should("not.be.visible");
    });
    it("focuses the trigger when closed", () => {
      trigger().click();
      cy.focused().type("{enter}");
      sideBar().should("not.be.visible");
      cy.focused().type("{enter}");
      sideBar().should("be.visible");
    });
  });
  describe("Open by default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("layout--with-side-bar-open-by-default");
    });
    it("is shown", () => {
      sideBar().should("be.visible");
    });
    it("slides out when triggered", () => {
      trigger().click();
      sideBar().should("not.be.visible");
    });
    it("slides in", () => {
      trigger().click();
      trigger().click();
      sideBar().should("be.visible");
    });
  });
  describe("Custom offset", () => {
    beforeEach(() => {
      cy.renderFromStorybook("layout--with-side-bar-custom-offset");
    });
    it("is shown", () => {
      sideBar().should("be.visible");
      sideBar().should("have.css", "right", "400px");
    });
    it("slides out when triggered", () => {
      trigger().click();
      sideBar().should("not.be.visible");
      sideBar().should("have.css", "right", "0px");
    });
    it("updates offset", () => {
    cy.changeKnob("offset", "35px");
      sideBar().should("have.css", "right", "35px");
    });
  });
});
