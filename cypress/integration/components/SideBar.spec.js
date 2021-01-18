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
  describe("accessibility", () => {
    beforeEach(() => {
      cy.renderFromStorybook("layout--with-side-bar");
    });
    it("focuses the close button when opened", () => {
      trigger().click();
      cy.focused().type("{enter}");
      sideBar().should("not.be.visible");
    });
  });
  describe("open by default", () => {
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
});
