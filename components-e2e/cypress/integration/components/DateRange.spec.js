describe("Date Range", () => {
  const getStartInputComponent = () => cy.get("input").eq(0);
  const getEndInputComponent = () => cy.get("input").eq(1);
  const getStartDate = () => cy.get(".nds-datepicker-day--start-date");
  const getEndDate = () => cy.get(".nds-datepicker-day--end-date");
  const getInRangeDates = () => cy.get(".nds-datepicker-day--in-range");

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("daterange--default-skipstoryshot");
    });

    it("shows start date in end date input", () => {
      getEndInputComponent().click();
      getStartDate().should("exist");
    });
    it("shows the end date in the start input", () => {
      getStartInputComponent().click();
      getEndDate().should("exist");
    });
    it("shows the range of dates", () => {
      getEndInputComponent().click();
      cy.get(".react-datepicker__day--004")
        .first()
        .click();
      getStartInputComponent().click();
      getInRangeDates().should("have.length", 4);
      getEndInputComponent().click();
      getInRangeDates().should("have.length", 4);
    });
    it("shows an error message if the start date is after the end date", () => {
      getStartInputComponent().click();
      cy.get(".react-datepicker__day--008")
        .first()
        .click();
      cy.contains("End date is before start date");
    });
  });
});
