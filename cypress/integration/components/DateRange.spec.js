describe("Date Range", () => {
  const getStartDate = () => cy.get(".nds-datepicker-day--start-date");
  const getEndDate = () => cy.get(".nds-datepicker-day--end-date");
  const getInRangeDates = () => cy.get(".nds-datepicker-day--in-range");
  const getStartInputComponent = () => cy.get("[aria-label='Select a start date']");
  const getEndInputComponent = () => cy.get("[aria-label='Select an end date']");

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("daterange--default-start-and-end-date");
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
  describe("With times", () => {
    const getStartTimeInputComponent = () => cy.get("[aria-label='Select a start time']");
    const getEndTimeInputComponent = () => cy.get("[aria-label='Select an end time']");
    const getEndTimeOptions = () => cy.get("[data-testid='daterange-end-time']").find("[data-testid*='select-option']");
    const getStartTimeOptions = () =>
      cy.get("[data-testid='daterange-start-time']").find("[data-testid*='select-option']");
    beforeEach(() => {
      cy.renderFromStorybook("daterange--with-times");
    });
    it("shows an error message if the start time is after the end time", () => {
      getStartInputComponent().click();
      cy.get(".react-datepicker__day--008")
        .first()
        .click();
      getStartTimeInputComponent().click();
      getStartTimeOptions()
        .eq(6)
        .click();
      getEndTimeInputComponent().click();
      getEndTimeOptions()
        .eq(3)
        .click();
      getEndInputComponent().click();
      cy.get(".react-datepicker__day--008")
        .first()
        .click();
      cy.contains("End time is before start time");
    });
  });
});
