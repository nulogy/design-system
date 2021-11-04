const radio = () => cy.get('[type="radio"]');

describe("Radio", () => {
  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radio--radio");
    });
    it("can be checked", () => {
      radio().should("not.be.checked");
      radio().check();
      radio().should("be.checked");
    });
  });
  describe("Checked", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radio--set-to-default-checked");
    });
    it("is checked", () => {
      radio().should("be.checked");
    });
  });
  describe("Disabled", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radio--set-to-disabled");
    });
    it("shows checked value", () => {
      radio().eq(0).should("not.be.checked");
      radio().eq(1).should("be.checked");
    });
    it("inputs are disabled", () => {
      radio().eq(0).should("be.disabled");
      radio().eq(1).should("be.disabled");
    });
  });
  describe("Controlled", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radio--controlled");
    });
    it("shows checked value", () => {
      radio().eq(1).should("not.be.checked");
      radio().eq(0).should("be.checked");
    });
    it("inputs do not update on click", () => {
      radio().eq(0).click();
      radio().eq(0).should("be.checked");
      radio().eq(1).click();
      radio().eq(1).should("not.be.checked");
    });
  });
  describe("Set Focus", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radio--using-ref-to-control-focus");
    });
    it("focus can be set", () => {
      radio().should("not.have.focus");
      cy.get("button").click();
      radio().should("have.focus");
    });
  });
});

describe("Radio Group", () => {
  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radiogroup--radio-group");
    });
    it("has the correct initial values", () => {
      radio().eq(0).should("not.be.checked");
      radio().eq(1).should("not.be.checked");
      radio().eq(2).should("not.be.checked");
    });
    it("can be checked", () => {
      radio().eq(1).check();
      radio().eq(1).should("be.checked");
      radio().eq(2).check();
      radio().eq(2).should("be.checked");
      radio().eq(1).should("not.be.checked");
    });
  });
  describe("All Props", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radiogroup--radio-group-with-all-props");
    });
    it("has the correct initial values", () => {
      radio().eq(0).should("be.checked");
      radio().eq(1).should("not.be.checked");
      radio().eq(2).should("not.be.checked");
    });
  });
  describe("Disabled", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radiogroup--set-to-disabled");
    });
    it("has the correct initial values", () => {
      radio().eq(0).should("be.checked");
      radio().eq(1).should("not.be.checked");
      radio().eq(2).should("not.be.checked");
    });
    it("all inputs are disabled", () => {
      radio().eq(0).should("be.disabled");
      radio().eq(1).should("be.disabled");
      radio().eq(2).should("be.disabled");
    });
  });
  describe("Controlled", () => {
    beforeEach(() => {
      cy.renderFromStorybook("radiogroup--controlled");
    });
    it("has the correct initial values", () => {
      radio().eq(0).should("be.checked");
      radio().eq(1).should("not.be.checked");
      radio().eq(2).should("not.be.checked");
    });
    it("values are not updated on click", () => {
      radio().eq(0).check();
      radio().eq(1).check();
      radio().eq(2).check();
      radio().eq(0).should("be.checked");
      radio().eq(1).should("not.be.checked");
      radio().eq(2).should("not.be.checked");
    });
  });
});
