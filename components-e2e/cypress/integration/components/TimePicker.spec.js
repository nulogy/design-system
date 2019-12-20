describe("Timepicker", () => {
  const getTimeInputComponent = () => cy.get("input");
  const TIME_OPTIONS_SELECTOR = "div[class*='-Menu']";
  const getDropdownOptions = () => cy.get("div[class*='SelectOption']");
  const getDropdownComponent = () => cy.get(TIME_OPTIONS_SELECTOR);
  const getValue = () => cy.get("div[class*='singleValue']");

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--default-skipstoryshots");
    });

    describe("displays time options", () => {
      it("can open a dropdown on click", () => {
        getDropdownComponent().should("not.exist");
        getTimeInputComponent().click();
        getDropdownComponent().should("exist");
      });

      it("can close the dropdown on click outside", () => {
        getTimeInputComponent().click();
        cy.isInViewport(TIME_OPTIONS_SELECTOR);
        cy.clickOutsideElement();
        getDropdownComponent().should("not.exist");
      });
    });

    describe("selects a date", () => {
      it("allows the user to select a time by clicking", () => {
        getTimeInputComponent().click();
        getDropdownOptions()
          .first()
          .click();
        getValue().should("have.text", "12:00 AM");
      });

      it("hides the calendar when a time is selected", () => {
        getTimeInputComponent().click();
        getDropdownOptions()
          .first()
          .click();
        getDropdownComponent().should("not.exist");
      });
    });
  });
});
