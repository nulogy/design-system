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
      getDateInputComponent().invoke("val").as("initialValue");
      getDateInputComponent().type("{downarrow}".repeat(5));
      cy.get("@initialValue").then((initialValue) => {
        getDateInputComponent().should("have.value", initialValue);
      });
    });
  });

  describe("With custom locale", () => {
    beforeEach(() => {
      cy.renderFromStorybook("datepickers-weekpicker--with-custom-locale");
    });

    it("displays weekdays in French", () => {
      getDateInputComponent().click();
      cy.get(".react-datepicker__day-name").eq(1).should("contain", "lu");
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
});
