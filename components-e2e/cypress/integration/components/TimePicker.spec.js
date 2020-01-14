describe("Timepicker", () => {
  const getTimeInputComponent = () => cy.get("input");
  const TIME_OPTIONS_SELECTOR = "div[class*='-Menu']";
  const TIME_OPTION_SELECTOR = "div[class*='SelectOption']";
  const getDropdownOptions = () => cy.get(TIME_OPTION_SELECTOR);
  const getDropdownComponent = () => cy.get(TIME_OPTIONS_SELECTOR);
  const getValue = () => cy.get("div[class*='singleValue']");

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--default");
    });

    describe("displays time options", () => {
      it("can open a dropdown on click", () => {
        getDropdownComponent().should("not.exist");
        getTimeInputComponent().click();
        getDropdownOptions()
          .first()
          .should("exist");
      });

      it("can close the dropdown on click outside", () => {
        getTimeInputComponent().click();
        cy.clickOutsideElement();
        getDropdownOptions().should("not.exist");
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
