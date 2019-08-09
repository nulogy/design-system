describe("Select", () => {
  const getSelectComponent = () => cy.get("[aria-label='open menu']");
  const getDropdownMenu = () => cy.get("[role='listbox']");
  const assertDropDownIsClosed = () => getDropdownMenu().should("not.exist");
  const assertDropDownIsOpen = () => getDropdownMenu().should("exist");

  it("selects the first item when opened", () => {
    cy.renderFromStorybook("select");

    getSelectComponent().click();

    cy.get("[aria-selected='true']").should("have.text", "V One");
  });

  it("selects an option on click", () => {
    cy.renderFromStorybook("select");

    assertDropDownIsClosed();

    getSelectComponent().click();
    cy.contains("V Two").click();

    cy.get("input").should("have.value", "V Two");
    assertDropDownIsClosed();
  });

  it("closes the dropdown when clicking outside", () => {
    cy.renderFromStorybook("select");

    getSelectComponent().click();
    assertDropDownIsOpen();

    cy.get("div#root").click("bottomRight");
    assertDropDownIsClosed();
  });

  it("opens the dropdown when the select label is clicked", () => {
    cy.renderFromStorybook("select");

    cy.contains("Select label").click("topLeft");

    assertDropDownIsOpen();
  });

  it("selects options using the keyboard", () => {
    cy.renderFromStorybook("select");

    // focus the select box
    getSelectComponent()
      .get("input")
      .focus();

    cy.focused()
      .type(" ")
      .type("{downarrow}")
      .type("{enter}");

    assertDropDownIsClosed();
    cy.get("input").should("have.value", "V Two");
  });

  it("closes the dropdown when on esc", () => {
    cy.renderFromStorybook("select");

    getSelectComponent().click();
    assertDropDownIsOpen();

    cy.focused().type("{esc}");
    assertDropDownIsClosed();
  });

  it("works as a controlled component", () => {
    cy.renderFromStorybook("controlled-select");

    assertDropDownIsClosed();

    getSelectComponent().click();
    cy.contains("V Two").click();

    cy.get("input").should("have.value", "V Two");
    assertDropDownIsClosed();
  });
});
