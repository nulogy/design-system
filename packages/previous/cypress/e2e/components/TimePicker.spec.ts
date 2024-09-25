describe("Timepicker", () => {
  const getTimePickerSelect = () => cy.get("[data-testid*='select-container']");
  const TIME_OPTIONS_SELECTOR = "[data-testid*='select-dropdown']";
  const TIME_OPTION_SELECTOR = "[data-testid*='select-option']";
  const TIME_OPTION_SELECTED_SELECTOR = "[data-testid*='selected-select-option']";
  const TIME_OPTION_CLOSEST_SELECTOR = "[data-testid*='closest-select-option']";
  const getSelectedOption = () => cy.get(TIME_OPTION_SELECTED_SELECTOR);
  const getClosestOption = () => cy.get(TIME_OPTION_CLOSEST_SELECTOR);
  const getDropdownOptions = () => cy.get(TIME_OPTION_SELECTOR);
  const getDropdownComponent = () => cy.get(TIME_OPTIONS_SELECTOR);
  const getInput = () => cy.get("[data-testid*='select-input']");

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--default");
    });

    describe("displays time options", () => {
      it("can open a dropdown on click", () => {
        getDropdownComponent().should("not.be.visible");
        getInput().click();
        getDropdownOptions().first().should("be.visible");
      });
    });

    describe("selects a time", () => {
      it("allows the user to select a time by clicking", () => {
        getInput().click();
        getDropdownOptions().first().click();
        getTimePickerSelect().contains("12:00 AM");
      });

      it("hides the calendar when a time is selected", () => {
        getInput().click();
        getDropdownOptions().first().click();
        getDropdownComponent().should("not.be.visible");
      });
      it("when pressing the down arrow key selects the next time interval", () => {
        getInput().type("{downArrow}");
        getSelectedOption().should("have.text", "12:00 AM");
        getInput().should("have.value", "12:00 AM");
        getInput().type("{downArrow}");
        getSelectedOption().should("have.text", "12:15 AM");
        getInput().should("have.value", "12:15 AM");
      });
      it("when pressing the up arrow key selects the previous time interval", () => {
        getInput().type("11p");
        getClosestOption().should("have.text", "11:00 PM");
        getInput().type("{upArrow}");
        getSelectedOption().should("have.text", "10:45 PM");
        getInput().should("have.value", "10:45 PM");
      });
    });

    describe("scrolls to current time", () => {
      it("shows matching times by interval", () => {
        getInput().click();
        cy.focused().type("11:");
        getDropdownOptions().should("have.length", 96);
        getDropdownOptions().contains("10:30 AM").should("be.visible");
        getDropdownOptions().contains("10:45 AM").should("be.visible");
        getDropdownOptions().contains("11:00 AM").should("be.visible");
        getDropdownOptions().contains("11:15 AM").should("be.visible");
        getDropdownOptions().contains("11:30 AM").should("be.visible");
      });
    });
    describe("allows typing in a time", () => {
      it("sets the input to the exact time that was entered", () => {
        getInput().click();
        cy.focused().type("3:18 PM");
        cy.focused().click();
        getInput().should("have.value", "3:18 PM");
      });
      it("ignores spaces in the time input", () => {
        getInput().click();
        cy.focused().type("3 : 2");
        getDropdownOptions().contains("3:15 AM").should("be.visible");
      });
      it("ignores lack of spaces in time input", () => {
        getInput().click();
        cy.focused().type("11:16PM{enter}");
        getInput().should("have.value", "11:15 PM");
      });
      it("uses first value when time in invalid", () => {
        getInput().click();
        cy.focused().type("ssss{enter}");
        getInput().should("have.value", "12:00 AM");
      });
      it("converts 24 hour time", () => {
        getInput().click();
        cy.focused().type("23:31{enter}");
        getInput().should("have.value", "11:30 PM");
      });
    });
    describe("hides the dropdown", () => {
      it("on outside click", () => {
        getInput().click();
        getDropdownComponent().should("be.visible");
        cy.get("body").click();
        getDropdownComponent().should("not.be.visible");
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
        cy.focused().type("{backspace}{backspace}{backspace}{backspace}{backspace}5:");
        getDropdownOptions().contains("4:45").should("be.visible");
        getDropdownOptions().contains("5:00").should("be.visible");
        getDropdownOptions().contains("5:15").should("be.visible");
        getDropdownOptions().contains("5:30").should("be.visible");
      });
      it("shows times by minute when minutes are added", () => {
        getInput().click();
        cy.focused().type("{backspace}{backspace}{backspace}{backspace}{backspace}23:");
        cy.focused().type("1");
        getDropdownOptions().contains("22:45").should("be.visible");
        getDropdownOptions().contains("23:00").should("be.visible");
        getDropdownOptions().contains("23:15").should("be.visible");
        getDropdownOptions().contains("23:30").should("be.visible");
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
        cy.focused().type("{backspace}{backspace}{backspace}{backspace}{backspace}5:");
        getDropdownOptions().contains("4:00").should("be.visible");
        getDropdownOptions().contains("04:30").should("be.visible");
        getDropdownOptions().contains("5:00").should("be.visible");
        getDropdownOptions().contains("5:30").should("be.visible");
        getDropdownOptions().contains("6:00").should("be.visible");
      });
    });
  });

  describe("min and max times", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--with-min-and-max-time");
    });
    describe("scrolls to closest times within the min and max time", () => {
      it("shows only options before the max time", () => {
        getInput().click();
        cy.focused().type("10:");
        getDropdownOptions().contains("10:00 AM").should("be.visible");
        getDropdownOptions().contains("10:15 AM").should("be.visible");
        getDropdownOptions().contains("10:30 AM").should("be.visible");
        getDropdownOptions().contains("9:45 AM").should("be.visible");
      });
    });
    describe("allows typing in a time", () => {
      it("ignores spaces in the time input", () => {
        getInput().click();
        cy.focused().type("3 : 2{enter}");
        getInput().should("have.value", "3:15 PM");
      });
      it("accepts military time", () => {
        getInput().click();
        cy.focused().type("21:00{enter}");
        getInput().should("have.value", "9:00 PM");
      });
    });
  });
});
