import React from "react";

import { NDSProvider, Select } from "@nulogy/components";

describe("Select", () => {
  const renderSelect = () => {
    const options = [
      { value: "v1", label: "V One" },
      { value: "v2", label: "V Two" },
      { value: "v3", label: "V Three" }
    ];

    cy.mount(
      <NDSProvider>
        <Select options={options} />
      </NDSProvider>
    );
  };

  const getSelectComponent = () => cy.get("[aria-label='open menu']");
  const getPage = () => cy.get("div#app");

  it("selects the first item when opened", () => {
    renderSelect();

    getSelectComponent().click();

    cy.get("[aria-selected='true']").should("have.text", "V One");
  });

  it("selects an option on click", () => {
    renderSelect();

    getPage().should("not.contain", "V Two");

    getSelectComponent().click();
    getPage().should("contain", "V Two");

    cy.get('[role="option"]')
      .contains("V Two")
      .click();

    cy.get("input").should("have.value", "V Two");

    // ensure the dropdown is closed
    getPage().should("not.contain", "V One");
  });

  it("closes the dropdown when clicking outside", () => {
    const options = [
      { value: "v1", label: "V One" },
      { value: "v2", label: "V Two" },
      { value: "v3", label: "V Three" }
    ];

    const styles = { width: "500px", height: "500px" };

    cy.mount(
      <NDSProvider>
        <div className="outer-container" style={styles}>
          <Select options={options} />
        </div>
      </NDSProvider>
    );

    getSelectComponent().click();
    getPage().should("contain", "V Three");

    cy.get("div.outer-container").click("bottomRight");
    getPage().should("not.contain", "V Three");
  });

  it("opens the dropdown when the select label is clicked", () => {
    const options = [{ value: "v1", label: "can you see me" }];

    cy.mount(
      <NDSProvider>
        <Select labelText="click me" options={options} />
      </NDSProvider>
    );

    cy.get("div")
      .contains("click me")
      .click("topLeft");

    getPage().should("contain", "can you see me");
  });

  it("selects options using the keyboard", () => {
    renderSelect();

    // focus the select box
    getSelectComponent()
      .get("input")
      .focus();

    cy.focused()
      .type(" ")
      .type("{downarrow}")
      .type("{enter}");

    getPage().should("not.contain", "V One");
    cy.get("input").should("have.value", "V Two");
  });

  it("closes the dropdown when on esc", () => {
    renderSelect();

    getSelectComponent().click();
    getPage().should("contain", "V One");

    cy.focused().type("{esc}");
    getPage().should("not.contain", "V One");
  });
});
