describe("Timepicker", () => {
  const getTimePickerSelect = () => cy.get("[data-testid='select-container']");
  const TIME_OPTIONS_SELECTOR = "[data-testid='select-dropdown']";
  const TIME_OPTION_SELECTOR = "[data-testid='select-option']";
  const getDropdownOptions = () => cy.get(TIME_OPTION_SELECTOR);
  const getDropdownComponent = () => cy.get(TIME_OPTIONS_SELECTOR);
  const getInput = () => cy.get("[data-testid='select-input']");

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--default");
    });

    describe("displays time options", () => {
      it("can open a dropdown on click", () => {
        getDropdownComponent().should("not.exist");
        getInput().click();
        getDropdownOptions()
          .first()
          .should("exist");
      });

      it("can close the dropdown on click outside", () => {
        getInput().click();
        cy.clickOutsideElement();
        getDropdownOptions().should("not.exist");
      });
    });

    describe("selects a date", () => {
      it("allows the user to select a time by clicking", () => {
        getInput().click();
        getDropdownOptions()
          .first()
          .click();
        getTimePickerSelect().contains("12:00 AM");
      });

      it("hides the calendar when a time is selected", () => {
        getInput().click();
        getDropdownOptions()
          .first()
          .click();
        getDropdownComponent().should("not.exist");
      });
    });
  });
});
