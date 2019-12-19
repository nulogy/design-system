describe("Timepicker", () => {
  const getTimeInputComponent = () => cy.get("input");
  const TIME_SELECTOR = ".react-datepicker-popper";
  const getDropdownComponent = () => cy.get(TIME_SELECTOR);

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timepicker--default-skipstoryshots");
    });

    describe("displays time options", () => {
      it("can open a dropdown on click", () => {
        getDropdownComponent().should("not.exist");
        getTimeInputComponent().click();
        getDropdownComponent().should("exist");
      });

      it("can close the dropdown on click outside", () => {
        getTimeInputComponent().click();
        cy.isInViewport(TIME_SELECTOR);
        cy.clickOutsideElement();
        getDropdownComponent().should("not.exist");
      });
    });

    describe("selects a date", () => {
      it("allows the user to select a time by clicking", () => {
        getTimeInputComponent().click();
        cy.get(".react-datepicker__time-list-item")
          .first()
          .click();
        getTimeInputComponent().should("have.value", "12:00 AM");
      });

      it("allows the user to select a time by typing", () => {
        cy.get("input").type("20:00");
        getTimeInputComponent().should("have.value", "20:00");
      });

      it("reformats the time from 24 hour time", () => {
        cy.get("input").type("20:00");
        cy.wait(1500);
        getTimeInputComponent().should("have.value", "08:00 PM");
        cy.get(".react-datepicker__time-list-item--selected").should(
          "have.text",
          "8:00 PM"
        );
      });

      it("reformats the time and selects it", () => {
        cy.get("input").type("11:45");
        cy.wait(1500);
        getTimeInputComponent().should("have.value", "11:45 AM");
        cy.get(".react-datepicker__time-list-item--selected").should(
          "have.text",
          "11:45 AM"
        );
      });

      it("reformats the time", () => {
        cy.get("input").type("12:35");
        cy.wait(1500);
        getTimeInputComponent().should("have.value", "12:35 PM");
        cy.get(".react-datepicker__time-list-item--selected").should(
          "not.exist"
        );
      });

      it("hides the calendar when a time is selected", () => {
        getTimeInputComponent().click();
        cy.get(".react-datepicker__time-list-item")
          .first()
          .click();
        getDropdownComponent().should("not.exist");
      });

      it("selects the time", () => {
        getTimeInputComponent().click();
        cy.get(".react-datepicker__time-list-item")
          .eq(3)
          .click();
        getTimeInputComponent().click();
        cy.get(".react-datepicker__time-list-item--selected").should("exist");
      });
    });
  });
});
