describe("Datepicker", () => {
  const getDateInputComponent = () => cy.get("[aria-label='select a date']");
  const CALENDAR_SELECTOR = ".react-datepicker-popper";
  const getCalendarComponent = () => cy.get(CALENDAR_SELECTOR);

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepicker--default");
    });

    describe("has the correct defaults", () => {
      it("has the correct date selected by default", () => {
        getDateInputComponent().should("have.value", "01 Jan 2019");
      });
    });

    describe("displays a calendar", () => {
      const closesOnKeyPress = (key) => {
        getDateInputComponent().type(key);
        getCalendarComponent().should("not.exist");
      };
      it("can open a calendar on click", () => {
        getCalendarComponent().should("not.exist");
        getDateInputComponent().click();
        getCalendarComponent().should("exist");
      });

      it("can close the calendar on click outside", () => {
        getDateInputComponent().click();
        cy.isInViewport(CALENDAR_SELECTOR);
        cy.clickOutsideElement();
        getCalendarComponent().should("not.exist");
      });

      it("can close a calendar on enter", () => {
        getDateInputComponent().click();
        closesOnKeyPress("{enter}");
      });

      it("displays the selected date in the calendar", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day--001.react-datepicker__day--selected").should("exist");
        cy.get(`${CALENDAR_SELECTOR} p`).contains("January 2019");
      });
    });

    describe("selects a date", () => {
      it("allows the user to select a date by clicking", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day--002").first().click();
        getDateInputComponent().should("have.value", "02 Jan 2019");
      });

      it("allows the user to select a date by typing", () => {
        getDateInputComponent().type("{backspace}{backspace}20");
        getDateInputComponent().should("have.value", "01 Jan 2020");
      });

      it("hides the calendar when a date is selected", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day--002").first().click();
        getCalendarComponent().should("not.exist");
      });

      it("selects the new date in the calendar", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day--002").first().click();
        getDateInputComponent().click();
        cy.get(".react-datepicker__day--001.react-datepicker__day--selected").should("not.exist");
        cy.get(".react-datepicker__day--002.react-datepicker__day--selected").should("exist");
      });

      it("allows the user to select a date in a earlier month", () => {
        const getPreviousMonthButton = () => cy.get("[aria-label='go to previous month']");

        getDateInputComponent().click();
        getPreviousMonthButton().click();
        cy.get(`${CALENDAR_SELECTOR} p`).contains("December 2018");
      });

      it("allows the user to select a date in a later month", () => {
        const getNextMonthButton = () => cy.get("[aria-label='go to next month']");

        getDateInputComponent().click();
        getNextMonthButton().click();
        cy.get(`${CALENDAR_SELECTOR} p`).contains("February 2019");
      });
      describe("with arrow keys", () => {
        it("pressing the down key selects the previous date", () => {
          getDateInputComponent().click();
          getDateInputComponent().type("{downarrow}");
          cy.get(".react-datepicker__day--031.react-datepicker__day--selected").should("exist");
          getDateInputComponent().should("have.value", "31 Dec 2018");
        });
        it("displays the current month", () => {
          getDateInputComponent().click();
          getDateInputComponent().type("{downarrow}");
          cy.get(`${CALENDAR_SELECTOR} p`).contains("December 2018");
        });
        it("pressing the up key selects the next date", () => {
          getDateInputComponent().click();
          getDateInputComponent().type("{uparrow}");
          cy.get(".react-datepicker__day--002.react-datepicker__day--selected").should("exist");
          getDateInputComponent().should("have.value", "02 Jan 2019");
        });
      });
    });
  });
  describe("With min and max date", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepicker--with-min-and-max-date");
    });
    describe("selecting a date", () => {
      describe("with arrow keys", () => {
        it("pressing the up arrow selects a next date up to the max date", () => {
          getDateInputComponent().click();
          getDateInputComponent().type("{uparrow}{uparrow}{uparrow}{uparrow}{uparrow}");
          cy.get(".react-datepicker__day--010.react-datepicker__day--selected").should("exist");
          getDateInputComponent().should("have.value", "10 Jan 2019");
          getDateInputComponent().type("{uparrow}");
          cy.get(".react-datepicker__day--010.react-datepicker__day--selected").should("exist");
          getDateInputComponent().should("have.value", "10 Jan 2019");
        });
        it("pressing the down arrow selects a previous date up to the min date", () => {
          getDateInputComponent().click();
          getDateInputComponent().type("{downarrow}{downarrow}");
          cy.get(".react-datepicker__day--003.react-datepicker__day--selected").should("exist");
          getDateInputComponent().should("have.value", "03 Jan 2019");
          getDateInputComponent().type("{downarrow}");
          cy.get(".react-datepicker__day--003.react-datepicker__day--selected").should("exist");
          getDateInputComponent().should("have.value", "03 Jan 2019");
        });
      });
    });
  });
});
