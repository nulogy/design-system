describe("Select", () => {
  const getSelectComponent = () => cy.get("[data-testid='select-container']");
  const getDropdownMenu = () => cy.get("[data-testid='select-dropdown']");
  const getValue = () => cy.get("[data-testid='select-control']");
  const getMultiselect = () => getSelectComponent();
  const getSelectedItems = () => cy.get("[data-testid='select-multivalue']");
  const getCloseButtons = () => cy.get("[data-testid='select-multivalue'] svg");
  const assertDropDownIsClosed = () => getDropdownMenu().should("not.exist");
  const assertDropDownIsOpen = () => getDropdownMenu().should("exist");

  describe("Multiselect", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-multiselect");
    });

    it("has the correct initial state", () => {
      cy.contains("PCN1");
      cy.contains("PCN2");
      cy.contains("PCN3").should("not.exist");
    });

    it("can select all values", () => {
      getMultiselect().click();

      cy.focused().type("{enter}");

      getMultiselect().click();

      cy.focused().type("{enter}");

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
      getMultiselect().contains("PCN4");
      getMultiselect().contains("PCN9");
    });

    it("selects the first item when opened", () => {
      getMultiselect().click();

      cy.focused().type("{enter}");

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
      getMultiselect().contains("PCN4");
      getMultiselect().contains("PCN9").should("not.exist");
    });

    it("removes a selected item", () => {
      getCloseButtons().first().click();

      getMultiselect().contains("PCN1");
    });

    it("removes using the keyboard", () => {
      getMultiselect().click();

      cy.focused().type("{leftarrow}");

      cy.focused().type("{del}");

      getMultiselect().contains("PCN2");
    });

    it("removes all selected items", () => {
      getSelectedItems().should("have.length", 2);

      getCloseButtons().first().click();

      getCloseButtons().first().click();

      getMultiselect().contains("Please select inventory status");
    });

    it("clears all selected items", () => {
      getClearButton().click();

      getMultiselect().contains("Please select inventory status");
    });
  });

  describe.only("Multiselect with copy/paste CSV functionality", () => {
    const getCopyCsvLabesButton = () => cy.get("[data-testid='csv-labels']");
    const getCopyCsvValuesButton = () => cy.get("[data-testid='csv-values']");
    const getCopyCsvValuesWithDuplicateButton = () => cy.get("[data-testid='csv-labels-with-duplicates']");
    const selectTextInputSelector = "[data-testid='select-input'] input";
    const getSelectTextInput = () => cy.get(selectTextInputSelector);

    beforeEach(() => {
      cy.renderFromStorybook("select--paste-csv-value-in-select");
    });

    it("copy and paste CSV labels to select", () => {
      const csvValues = "PCN2, PCN4";

      paste({ destinationSelector: selectTextInputSelector, pasteType: "text/plain", pastePayload: csvValues });

      getMultiselect().contains("PCN2");
      getMultiselect().contains("PCN4");
    });

    it("copy and paste CSV values to select", () => {
      const csvValues = "2, 1";

      paste({ destinationSelector: selectTextInputSelector, pasteType: "text/plain", pastePayload: csvValues });

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
    });

    it("ignoring duplicated values", () => {
      const csvValues = "2, 2, 1";

      paste({ destinationSelector: selectTextInputSelector, pasteType: "text/plain", pastePayload: csvValues });

      getSelectedItems().should("have.length", 2);

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
    });

    it("ignoring values that are already selected", () => {
      const csvValues = "2, 1";

      paste({ destinationSelector: selectTextInputSelector, pasteType: "text/plain", pastePayload: csvValues });

      getSelectedItems().should("have.length", 2);

      const csvValues = "2, 4";
      paste({ destinationSelector: selectTextInputSelector, pasteType: "text/plain", pastePayload: csvValues });

      getSelectedItems().should("have.length", 3);

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
      getMultiselect().contains("PCN4");
    });

    it("values that are not in options list are disabled on view", () => {
      const csvValues = "PCN1, PCN5";

      paste({ destinationSelector: selectTextInputSelector, pasteType: "text/plain", pastePayload: csvValues });

      getMultiselect().contains("PCN1").should("not.have.class", "disabled");
      getMultiselect().contains("PCN5").should("have.class", "disabled");
    });
  });

  describe("Default", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--select");
    });
    it("selects the first item when opened", () => {
      getSelectComponent().click();

      cy.focused().type("{enter}");

      getValue().should("have.text", "Accepted");
    });

    it("selects an option on click", () => {
      assertDropDownIsClosed();

      getSelectComponent().click();

      getSelectComponent().contains("Assigned to a line").click();

      getValue().should("have.text", "Assigned to a line");
      assertDropDownIsClosed();
    });

    it("closes the dropdown when clicking outside", () => {
      getSelectComponent().click();
      assertDropDownIsOpen();

      cy.get("body").click("bottomRight");
      assertDropDownIsClosed();
    });

    it("selects options using the keyboard", () => {
      // focus the select box
      getSelectComponent().click();

      cy.focused().type("{downarrow}").type("{enter}");

      assertDropDownIsClosed();
      getValue().should("have.text", "Assigned to a line");
    });

    it("closes the dropdown when on esc", () => {
      getSelectComponent().click();
      assertDropDownIsOpen();

      cy.focused().type("{esc}");
      assertDropDownIsClosed();
    });
  });

  describe("with state", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-state");
    });
    it("works as a controlled component", () => {
      assertDropDownIsClosed();

      getSelectComponent().click();
      getSelectComponent().contains("Assigned to a line").click();

      getValue().should("have.text", "Assigned to a line");
      assertDropDownIsClosed();
    });
  });
  describe("with close menu after selection turned off", () => {
    beforeEach(() => {
      cy.renderFromStorybook("select--with-close-menu-on-select-turned-off");
    });
    it("does not close the menu after selecting an option", () => {
      assertDropDownIsClosed();

      getMultiselect().click();

      cy.focused().type("{enter}");

      getMultiselect().contains("PCN1");
      getMultiselect().contains("PCN2");
      getMultiselect().contains("PCN4");

      assertDropDownIsOpen();
    });
  });
  describe("Knobs", () => {});
});

function paste({ destinationSelector, pastePayload, pasteType = "text/plain" }) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  cy.get(destinationSelector).then(($destination) => {
    const pasteEvent = Object.assign(new Event("paste", { bubbles: true, cancelable: true }), {
      clipboardData: {
        getData: (type = pasteType) => pastePayload,
      },
    });
    $destination[0].dispatchEvent(pasteEvent);
  });
}
