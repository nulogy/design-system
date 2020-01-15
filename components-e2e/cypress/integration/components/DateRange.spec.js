describe("Date Range", () => {
  const getStartDate = () => cy.get(".nds-datepicker-day--start-date");
  const getEndDate = () => cy.get(".nds-datepicker-day--end-date");
  const getInRangeDates = () => cy.get(".nds-datepicker-day--in-range");

  describe("Default", () => {
    const getStartInputComponent = () => cy.get("input").eq(0);
    const getEndInputComponent = () => cy.get("input").eq(1);
    beforeEach(() => {
      cy.renderFromStorybook("daterange--default");
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
    const getStartInputComponent = () => cy.get("input").eq(0);
    const getStartTimeInputComponent = () => cy.get("input").eq(1);
    const getEndTimeInputComponent = () => cy.get("input").eq(2);
    const getEndInputComponent = () => cy.get("input").eq(3);
    const TIME_OPTION_SELECTOR = "div[class*='SelectOption']";
    const getDropdownOptions = () => cy.get(TIME_OPTION_SELECTOR);
    beforeEach(() => {
      cy.renderFromStorybook("daterange--with-times");
    });
    it("shows an error message if the start time is after the end time", () => {
      getStartInputComponent().click();
      cy.get(".react-datepicker__day--008")
        .first()
        .click();
      getStartTimeInputComponent().click();
      getDropdownOptions()
        .eq(6)
        .click();
      getEndTimeInputComponent().click();
      getDropdownOptions()
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
