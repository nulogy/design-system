describe("Time Range", () => {
  const getStartTimeInputComponent = () => cy.get("[aria-label='Select a start time']");
  const getEndTimeInputComponent = () => cy.get("[aria-label='Select an end time']");
  const TIME_OPTION_SELECTOR = "[data-testid*='select-option']";
  const getValue = (i = 0) => cy.get("[data-testid='select-input']").eq(i);
  const getEndTimePicker = () => cy.get("[data-testid='timerange-end-time']");
  const getStartTimePicker = () => cy.get("[data-testid='timerange-start-time']");
  const getEndTimeOptions = () => getEndTimePicker().find(TIME_OPTION_SELECTOR);
  const getStartTimeOptions = () => getStartTimePicker().find(TIME_OPTION_SELECTOR);

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timerange--with-min-and-max-time-range");
    });

    it("shows options that are after the selected start time for the end time", () => {
      getStartTimeInputComponent().click();
      getStartTimeOptions()
        .eq(5)
        .click();
      getValue().should("have.value", "10:15 AM");
      getEndTimeInputComponent().click();
      getEndTimeOptions()
        .eq(0)
        .should("have.text", "10:15 AM");
      getEndTimeOptions().each($el => cy.get($el).should("not.have.value", "10:00 AM"));
    });
    it("shows options that are before the selected end time for the start time", () => {
      getEndTimeInputComponent().click();
      getEndTimeOptions()
        .eq(2)
        .click();
      getValue(1).should("have.value", "9:30 AM");
      getStartTimeInputComponent().click();
      getEndTimeOptions()
        .eq(0)
        .should("have.text", "9:00 AM");
      getStartTimeOptions().each($el => cy.get($el).should("not.have.value", "9:45 AM"));
    });
  });
});
