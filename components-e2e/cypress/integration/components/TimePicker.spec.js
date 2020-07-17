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
        getDropdownComponent().should("not.be.visible");
        getInput().click();
        getDropdownOptions()
          .first()
          .should("be.visible");
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
        getDropdownComponent().should("not.be.visible");
      });
    });

    describe("scrolls to current time", () => {
      it("shows matching times by interval", () => {
        getInput().click();
        cy.focused().type("11:");
        getDropdownOptions().should("have.length", 96);
        getDropdownOptions()
          .contains("10:30 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("10:45 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("11:00 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("11:15 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("11:30 AM")
          .should("be.visible");
      });
      it("shows first matching time intervals near time", () => {
        getInput().click();
        cy.focused().type("3:18");
        getDropdownOptions()
          .contains("02:45 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("03:00 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("03:15 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("03:30 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("03:45 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("04:45 AM")
          .should("not.be.visible");
      });
    });
    describe("allows typing in a time", () => {
      it("sets the input to the exact time that was entered", () => {
        getInput().click();
        cy.focused().type("3:18 PM");
        cy.clickOutsideElement();
        getInput().should("have.value", "03:18 PM");
      });
      it("ignores spaces in the time input", () => {
        getInput().click();
        cy.focused().type("3 : 2");
        getDropdownOptions()
          .contains("03:15 AM")
          .should("be.visible");
      });
      it("ignores lack of spaces in time input", () => {
        getInput().click();
        cy.focused().type("11:16PM");
        cy.clickOutsideElement();
        getInput().should("have.value", "11:16 PM");
      });
      it("uses first value when time in invalid", () => {
        getInput().click();
        cy.focused().type("ssss");
        cy.clickOutsideElement();
        getInput().should("have.value", "12:00 AM");
      });
      it("converts 24 hour time", () => {
        getInput().click();
        cy.focused().type("23:31");
        cy.clickOutsideElement();
        getInput().should("have.value", "11:31 PM");
      });
    });
  });

  describe("24 hour time format", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--with-custom-time-format");
    });
    describe("scrolls to closest times", () => {
      it("shows matching times by interval", () => {
        getInput().click();
        cy.focused().type(
          "{backspace}{backspace}{backspace}{backspace}{backspace}5:"
        );
        getDropdownOptions()
          .contains("04:45")
          .should("be.visible");
        getDropdownOptions()
          .contains("05:00")
          .should("be.visible");
        getDropdownOptions()
          .contains("05:15")
          .should("be.visible");
        getDropdownOptions()
          .contains("05:30")
          .should("be.visible");
      });
      it("shows times by minute when minutes are added", () => {
        getInput().click();
        cy.focused().type(
          "{backspace}{backspace}{backspace}{backspace}{backspace}23:"
        );
        cy.focused().type("1");
        getDropdownOptions()
          .contains("22:45")
          .should("be.visible");
        getDropdownOptions()
          .contains("23:00")
          .should("be.visible");
        getDropdownOptions()
          .contains("23:15")
          .should("be.visible");
        getDropdownOptions()
          .contains("23:30")
          .should("be.visible");
      });
    });
  });

  describe("30 minute time interval", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--with-custom-time-interval");
    });
    describe("scrolls to closest times", () => {
      it("shows matching times by interval", () => {
        getInput().click();
        cy.focused().type(
          "{backspace}{backspace}{backspace}{backspace}{backspace}5:"
        );
        getDropdownOptions()
          .contains("04:00")
          .should("be.visible");
        getDropdownOptions()
          .contains("04:30")
          .should("be.visible");
        getDropdownOptions()
          .contains("05:00")
          .should("be.visible");
        getDropdownOptions()
          .contains("05:30")
          .should("be.visible");
        getDropdownOptions()
          .contains("06:00")
          .should("be.visible");
      });
    });
  });

  describe("min and max times", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--with-min-and-max-time");
    });
    describe("scrolls to closest times within the min and max time", () => {
      it("shows only options after the min time", () => {
        getInput().click();
        cy.focused().type("8:");
        cy.focused().type("1");
        getDropdownOptions()
          .contains("08:00 PM")
          .should("be.visible");
        getDropdownOptions()
          .contains("08:15 PM")
          .should("be.visible");
        getDropdownOptions()
          .contains("08:30 PM")
          .should("be.visible");
        getDropdownOptions()
          .contains("07:45 PM")
          .should("be.visible");
      });
      it("shows only options before the max time", () => {
        getInput().click();
        cy.focused().type("10:");
        getDropdownOptions()
          .contains("10:00 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("10:15 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("10:30 AM")
          .should("be.visible");
        getDropdownOptions()
          .contains("09:45 AM")
          .should("be.visible");
      });
    });
    describe("allows typing in a time", () => {
      it("ignores spaces in the time input", () => {
        getInput().click();
        cy.focused().type("3 : 2");
        cy.clickOutsideElement();
        getInput().should("have.value", "03:20 PM");
      });
      it("uses min value when time is invalid", () => {
        getInput().click();
        cy.focused().type("ssss");
        cy.clickOutsideElement();
        getInput().should("have.value", "09:00 AM");
      });
      it("uses min value when time is out of bounds", () => {
        getInput().click();
        cy.focused().type("23:31");
        cy.clickOutsideElement();
        getInput().should("have.value", "09:00 AM");
      });
      it("can type in max time", () => {
        getInput().click();
        cy.focused().type("9:00 PM");
        cy.clickOutsideElement();
        getInput().should("have.value", "09:00 PM");
      });
    });
  });
});
