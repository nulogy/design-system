describe("Monthpicker", () => {
  const getMonthInputComponent = () => cy.get("input");
  const CALENDAR_SELECTOR = ".react-datepicker";
  const getCalendarComponent = () => cy.get(CALENDAR_SELECTOR);

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("monthpicker--default-skipstoryshots");
    });

    describe("has the correct defaults", () => {
      it("has the correct date selected by default", () => {
        getMonthInputComponent().should("have.value", "Jan 2019");
      });
    });

    describe("displays a calendar", () => {
      it("can open a calendar on click", () => {
        getCalendarComponent().should("not.exist");
        getMonthInputComponent().click();
        getCalendarComponent().should("exist");
      });

      it("can close the calendar on click outside", () => {
        getMonthInputComponent().click();
        cy.isInViewport(CALENDAR_SELECTOR);
        cy.clickOutsideElement();
        getCalendarComponent().should("not.exist");
      });

      it("displays the selected date in the calendar", () => {
        getMonthInputComponent().click();
        cy.get(
          ".react-datepicker__month-0.react-datepicker__month--selected"
        ).should("exist");
        cy.get(".react-datepicker__header").contains("2019");
      });
    });

    describe("selects a date", () => {
      it("allows the user to select a date by clicking", () => {
        getMonthInputComponent().click();
        cy.get(".react-datepicker__month-2")
          .first()
          .click();
        getMonthInputComponent().should("have.value", "Mar 2019");
      });

      it("allows the user to select a date by typing", () => {
        cy.get("input").type("{backspace}{backspace}20");
        getMonthInputComponent().should("have.value", "Jan 2020");
      });

      it("hides the calendar when a date is selected", () => {
        getMonthInputComponent().click();
        cy.get(".react-datepicker__month-2")
          .first()
          .click();
        getCalendarComponent().should("not.exist");
      });

      it("selects the new date in the calendar", () => {
        getMonthInputComponent().click();
        cy.get(".react-datepicker__month-2")
          .first()
          .click();
        getMonthInputComponent().click();
        cy.get(
          ".react-datepicker__month-1.react-datepicker__month--selected"
        ).should("not.exist");
        cy.get(
          ".react-datepicker__month-2.react-datepicker__month--selected"
        ).should("exist");
      });

      it("allows the user to select a date in a earlier month", () => {
        const getPreviousMonthButton = () =>
          cy.get("button.react-datepicker__navigation--previous");

        getMonthInputComponent().click();
        getPreviousMonthButton().click();
        cy.get(".react-datepicker__header").contains("2018");
      });

      it("allows the user to select a date in a later month", () => {
        const getNextMonthButton = () =>
          cy.get("button.react-datepicker__navigation--next");

        getMonthInputComponent().click();
        getNextMonthButton().click();
        cy.get(".react-datepicker__header").contains("2020");
      });
    });
  });
});
