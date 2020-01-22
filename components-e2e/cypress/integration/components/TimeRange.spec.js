describe("Time Range", () => {
  const getStartTimeInputComponent = () => cy.get("input").eq(0);
  const getEndTimeInputComponent = () => cy.get("input").eq(1);
  const TIME_OPTION_SELECTOR = "div[class*='SelectOption']";
  const getDropdownOptions = () => cy.get(TIME_OPTION_SELECTOR);
  const getValue = (i = 0) => cy.get("div[class*='singleValue']").eq(i);

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("timerange--with-min-and-max-time-range");
    });

    it("shows options that are after the selected start time for the end time", () => {
      getStartTimeInputComponent().click();
      getDropdownOptions()
        .eq(5)
        .click();
      getValue().should("have.text", "10:15 AM");
      getEndTimeInputComponent().click();
      getDropdownOptions()
        .eq(0)
        .should("have.text", "10:15 AM");
      getDropdownOptions().each($el =>
        cy.get($el).should("not.have.text", "10:00 AM")
      );
    });
    it("shows options that are before the selected end time for the start time", () => {
      getEndTimeInputComponent().click();
      getDropdownOptions()
        .eq(10)
        .click();
      getValue().should("have.text", "11:30 AM");
      getStartTimeInputComponent().click();
      getDropdownOptions()
        .eq(0)
        .should("have.text", "09:00 AM");
      getDropdownOptions().each($el =>
        cy.get($el).should("not.have.text", "11:45 AM")
      );
    });
  });
});
