describe("Datepicker", () => {
  const getDateInputComponent = () => cy.get("input");
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

      it("displays the selected date in the calendar", () => {
        getDateInputComponent().click();
        cy.get(
          ".react-datepicker__day--001.react-datepicker__day--selected"
        ).should("exist");
        cy.get(`${CALENDAR_SELECTOR} p`).contains("January 2019");
      });
    });

    describe("selects a date", () => {
      it("allows the user to select a date by clicking", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day--002")
          .first()
          .click();
        getDateInputComponent().should("have.value", "02 Jan 2019");
      });

      it("allows the user to select a date by typing", () => {
        cy.get("input").type("{backspace}{backspace}20");
        getDateInputComponent().should("have.value", "01 Jan 2020");
      });

      it("hides the calendar when a date is selected", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day--002")
          .first()
          .click();
        getCalendarComponent().should("not.exist");
      });

      it("selects the new date in the calendar", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day--002")
          .first()
          .click();
        getDateInputComponent().click();
        cy.get(
          ".react-datepicker__day--001.react-datepicker__day--selected"
        ).should("not.exist");
        cy.get(
          ".react-datepicker__day--002.react-datepicker__day--selected"
        ).should("exist");
      });

      it("allows the user to select a date in a earlier month", () => {
        const getPreviousMonthButton = () =>
          cy.get("button[aria-label='go to previous month']");

        getDateInputComponent().click();
        getPreviousMonthButton().click();
        cy.get(`${CALENDAR_SELECTOR} p`).contains("December 2018");
      });

      it("allows the user to select a date in a later month", () => {
        const getNextMonthButton = () =>
          cy.get("button[aria-label='go to next month']");

        getDateInputComponent().click();
        getNextMonthButton().click();
        cy.get(`${CALENDAR_SELECTOR} p`).contains("February 2019");
      });
    });
  });
});
