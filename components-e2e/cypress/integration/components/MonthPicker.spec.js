describe("Monthpicker", () => {
  const getMonthInputComponent = () => cy.get("input");
  const CALENDAR_SELECTOR = ".react-datepicker";
  const getCalendarComponent = () => cy.get(CALENDAR_SELECTOR);

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("monthpicker--default");
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

      it("allows the user to select a date in a earlier year", () => {
        const getPreviousMonthButton = () =>
          cy.get("button.react-datepicker__navigation--previous");

        getMonthInputComponent().click();
        getPreviousMonthButton().click();
        cy.get(".react-datepicker__header").contains("2018");
      });

      it("allows the user to select a date in a later year", () => {
        const getNextMonthButton = () =>
          cy.get("button.react-datepicker__navigation--next");

        getMonthInputComponent().click();
        getNextMonthButton().click();
        cy.get(".react-datepicker__header").contains("2020");
      });
    });

    describe("month autofill", () => {
      it("does not autofill when typed characters don't match", () => {
        cy.get("input")
          .clear()
          .type("app");
        getMonthInputComponent().should("have.value", "app");
      });
      it("does not autofill when not enough letters are typed", () => {
        cy.get("input")
          .clear()
          .type("de");
        getMonthInputComponent().should("have.value", "de");
      });
      it("autofills when typing characters that match case", () => {
        cy.get("input")
          .clear()
          .type("Apr");
        cy.get(
          ".react-datepicker__month-3.react-datepicker__month--selected"
        ).should("exist");
        getMonthInputComponent().should("have.value", "Apr 2019");
      });
      it("autofills when typing characters that ignore case", () => {
        cy.get("input")
          .clear()
          .type("mar");
        cy.get(
          ".react-datepicker__month-2.react-datepicker__month--selected"
        ).should("exist");
        getMonthInputComponent().should("have.value", "Mar 2019");
      });
      it("uses the last selected year to fill in the year", () => {
        cy.get("input").type("{backspace}{backspace}30");
        cy.get("input")
          .clear()
          .type("aug");
        cy.get(
          ".react-datepicker__month-7.react-datepicker__month--selected"
        ).should("exist");
        getMonthInputComponent().should("have.value", "Aug 2030");
      });
    });
  });
  describe("Min and Max date", () => {
    beforeEach(() => {
      cy.renderFromStorybook("monthpicker--with-a-min-and-max-date");
    });
    describe("selects a date", () => {
      it("allows the user to select a date by clicking with the range", () => {
        getMonthInputComponent().click();
        cy.get(".react-datepicker__month-8")
          .first()
          .click();
        getMonthInputComponent().should("have.value", "Sep 2019");
      });
      it("does not a allow selecting a date before the min date", () => {
        getMonthInputComponent().click();
        cy.get(".react-datepicker__month-5")
          .first()
          .click();
        getMonthInputComponent().should("have.value", "Jul 2019");
      });
      it("does not a allow selecting a date after the max date", () => {
        const getNextMonthButton = () =>
          cy.get("button.react-datepicker__navigation--next");

        getMonthInputComponent().click();
        getNextMonthButton().should("not.exist");
      });
    });
    describe("month autofill", () => {
      it("does not autofill when month is not in range", () => {
        cy.get("input")
          .clear()
          .type("jan");
        getMonthInputComponent().should("have.value", "jan");
      });
      it("autofills when month is on range", () => {
        cy.get("input")
          .clear()
          .type("jul");
        cy.get(
          ".react-datepicker__month-6.react-datepicker__month--selected"
        ).should("exist");
        getMonthInputComponent().should("have.value", "Jul 2019");
      });
      it("autofills when month is within range", () => {
        cy.get("input")
          .clear()
          .type("SEP");
        cy.get(
          ".react-datepicker__month-8.react-datepicker__month--selected"
        ).should("exist");
        getMonthInputComponent().should("have.value", "Sep 2019");
      });
    });
  });
});
