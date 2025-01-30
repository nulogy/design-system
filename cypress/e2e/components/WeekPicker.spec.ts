describe("WeekPicker", () => {
  const getDateInputComponent = () => cy.get("[aria-label='select a date']");
  const CALENDAR_SELECTOR = ".react-datepicker-popper";
  const getCalendarComponent = () => cy.get(CALENDAR_SELECTOR);

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepickers-weekpicker--default");
    });

    describe("has the correct defaults", () => {
      it("shows the correct placeholder text", () => {
        getDateInputComponent().should("have.attr", "placeholder", "Week of Mon DD, YYYY");
      });

      it("shows the label text", () => {
        cy.contains("Expiry Date").should("exist");
      });
    });

    describe("displays a calendar", () => {
      it("can open a calendar on click", () => {
        getCalendarComponent().should("not.exist");
        getDateInputComponent().click();
        getCalendarComponent().should("exist");
      });

      it("shows week numbers in the calendar", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__week-number").should("exist");
      });

      it("can close the calendar on click outside", () => {
        getDateInputComponent().click();
        cy.isInViewport(CALENDAR_SELECTOR);
        cy.clickOutsideElement();
        getCalendarComponent().should("not.exist");
      });

      it("can close the calendar on enter", () => {
        getDateInputComponent().click();
        getDateInputComponent().type("{enter}");
        getCalendarComponent().should("not.exist");
      });
    });

    describe("selects a week", () => {
      it.skip("allows selecting a week by clicking a day", () => {
        getDateInputComponent().click();
        // Click any day in a week
        cy.get(".react-datepicker__day:not(.react-datepicker__day--outside-month)").first().click();
        // Verify the input shows "Week of" format
        getDateInputComponent().contains(/Week of [A-Za-z]+ \d{1,2}, \d{4}/);
      });

      it.skip("highlights the entire week when a day is selected", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day:not(.react-datepicker__day--outside-month)").first().click();
        getDateInputComponent().click();
        cy.get(".react-datepicker__week .react-datepicker__day--selected").should("have.length", 7);
      });

      it("navigates weeks using arrow keys", () => {
        getDateInputComponent().click();
        cy.get(".react-datepicker__day:not(.react-datepicker__day--outside-month)").first().click();
        const initialValue = getDateInputComponent().invoke("val");

        // Press up arrow to go to previous week
        getDateInputComponent().type("{uparrow}");
        getDateInputComponent().should("not.have.value", initialValue);

        // Press down arrow to go to next week
        getDateInputComponent().type("{downarrow}");
        getDateInputComponent().should("have.value", initialValue);
      });
    });
  });

  describe("With min and max dates", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepickers-weekpicker--with-min-max-dates");
    });

    it("disables weeks before min date", () => {
      getDateInputComponent().click();
      // Check for disabled days before min date
      cy.get(".react-datepicker__day--disabled").should("exist");
    });

    it("disables weeks after max date", () => {
      getDateInputComponent().click();
      // Navigate to max date month if needed
      cy.get(".react-datepicker__day--disabled").should("exist");
    });

    it("prevents keyboard navigation beyond min/max dates", () => {
      getDateInputComponent().click();
      // Select first available week
      cy.get(".react-datepicker__day:not(.react-datepicker__day--disabled)").first().click();
      const initialValue = getDateInputComponent().invoke("val");

      // Try to go before min date
      getDateInputComponent().type("{downarrow}".repeat(5));
      getDateInputComponent().should("have.value", initialValue);
    });
  });

  describe("With custom date format", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepickers-weekpicker--with-custom-date-format");
    });

    it("displays the date in custom format", () => {
      getDateInputComponent().click();
      cy.get(".react-datepicker__day:not(.react-datepicker__day--outside-month)").first().click();
      getDateInputComponent().should("have.value", /Week starting \d{2}\/\d{2}\/\d{4}/);
    });
  });

  describe("With custom locale", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepickers-weekpicker--with-custom-locale");
    });

    it("displays weekdays in French", () => {
      getDateInputComponent().click();
      cy.get(".react-datepicker__day-name").first().should("contain", "lu");
    });

    it("displays month in French", () => {
      getDateInputComponent().click();
      cy.get(".react-datepicker__current-month").should(
        "match",
        /janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre/
      );
    });
  });

  describe("Disabled state", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepickers-weekpicker--disabled");
    });

    it("has disabled input", () => {
      getDateInputComponent().should("be.disabled");
    });

    it("cannot open calendar when disabled", () => {
      getDateInputComponent().click({ force: true });
      getCalendarComponent().should("not.exist");
    });
  });

  describe("With error", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepickers-weekpicker--with-error");
    });

    it("displays error message", () => {
      cy.contains("Please select a valid week").should("exist");
    });

    it("shows error styling on input", () => {
      getDateInputComponent().should("have.class", /.*error.*/);
    });
  });
});
