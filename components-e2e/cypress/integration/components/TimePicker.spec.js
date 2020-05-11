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

    describe("selects a time", () => {
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
    describe("suggests times", () => {
      it("shows matching times by interval", () => {
        getInput().click();
        cy.focused().type("11:");
        getDropdownOptions().should("have.length", 8);
        getDropdownOptions()
          .first()
          .contains("11:00 AM");
        getDropdownOptions()
          .eq(1)
          .contains("11:15 AM");
        getDropdownOptions()
          .eq(2)
          .contains("11:30 AM");
        getDropdownOptions()
          .eq(3)
          .contains("11:45 AM");
        getDropdownOptions()
          .eq(4)
          .contains("11:00 PM");
        getDropdownOptions()
          .eq(5)
          .contains("11:15 PM");
        getDropdownOptions()
          .eq(6)
          .contains("11:30 PM");
        getDropdownOptions()
          .eq(7)
          .contains("11:45 PM");
      });
      it("shows times by minute when minutes are added", () => {
        getInput().click();
        cy.focused().type("3:");
        cy.focused().type("1");
        getDropdownOptions()
          .first()
          .contains("03:10 AM");
        getDropdownOptions()
          .eq(1)
          .contains("03:11 AM");
        getDropdownOptions()
          .eq(2)
          .contains("03:12 AM");
        getDropdownOptions()
          .eq(8)
          .contains("03:18 AM");
      });
      it("shows am and pm if not specified", () => {
        getInput().click();
        cy.focused().type("3:18");
        getDropdownOptions().should("have.length", 2);
        getDropdownOptions()
          .first()
          .contains("03:18 AM");
        getDropdownOptions()
          .eq(1)
          .contains("03:18 PM");
      });
      it("shows exact time if an exact time is entered", () => {
        getInput().click();
        cy.focused().type("3:18 PM");
        getDropdownOptions().should("have.length", 1);
        getDropdownOptions()
          .eq(0)
          .contains("03:18 PM");
      });
      it("ignores spaces in the time input", () => {
        getInput().click();
        cy.focused().type("3 : 2");
        getDropdownOptions()
          .eq(0)
          .contains("03:20 AM");
        getDropdownOptions()
          .eq(1)
          .contains("03:21 AM");
      });
      it("ignores lack of spaces in time input", () => {
        getInput().click();
        cy.focused().type("11:16PM");
        getDropdownOptions()
          .eq(0)
          .contains("11:16 PM");
      });
    });
  });

  describe("24 hour time format", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--with-custom-time-format");
    });
    describe("suggests times", () => {
      it("shows matching times by interval", () => {
        getInput().click();
        cy.focused().type("5:");
        getDropdownOptions().should("have.length", 4);
        getDropdownOptions()
          .first()
          .contains("05:00");
        getDropdownOptions()
          .eq(1)
          .contains("05:15");
      });
      it("shows times by minute when minutes are added", () => {
        getInput().click();
        cy.focused().type("3:");
        cy.focused().type("1");
        getDropdownOptions()
          .first()
          .contains("03:10");
        getDropdownOptions()
          .eq(1)
          .contains("03:11");
        getDropdownOptions()
          .eq(2)
          .contains("03:12");
        getDropdownOptions()
          .eq(8)
          .contains("03:18");
      });
    });
  });

  describe("min and max times", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--with-min-and-max-time");
    });
    describe("suggests times within the min and max time", () => {
      it("shows only options after the min time", () => {
        getInput().click();
        cy.focused().type("8:");
        getDropdownOptions().should("have.length", 4);
        getDropdownOptions()
          .first()
          .contains("08:00 PM");
        getDropdownOptions()
          .eq(1)
          .contains("08:15 PM");
        getDropdownOptions()
          .eq(2)
          .contains("08:30 PM");
        getDropdownOptions()
          .eq(3)
          .contains("08:45 PM");
      });
      it("shows only options before the max time", () => {
        getInput().click();
        cy.focused().type("10:");
        getDropdownOptions().should("have.length", 4);
        getDropdownOptions()
          .first()
          .contains("10:00 AM");
        getDropdownOptions()
          .eq(1)
          .contains("10:15 AM");
        getDropdownOptions()
          .eq(2)
          .contains("10:30 AM");
        getDropdownOptions()
          .eq(3)
          .contains("10:45 AM");
      });
      it("shows minute options only within the min and max range", () => {
        getInput().click();
        cy.focused().type("10:1");
        getDropdownOptions()
          .first()
          .contains("10:10 AM");
        getDropdownOptions()
          .eq(1)
          .contains("10:11 AM");
        getDropdownOptions()
          .eq(2)
          .contains("10:12 AM");
        getDropdownOptions()
          .eq(8)
          .contains("10:18 AM");
      });
    });
  });
});
