import React from "react";

import { NDSProvider, Select } from "@nulogy/components";

describe("Select", () => {
  it("selects the first item when opened", () => {
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

    cy.get("[aria-label='open menu']").click();

    cy.get("[aria-selected='true']").should("have.text", "V One");
  });

  it("selects an option on click", () => {
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

    cy.get("div#app").should("not.contain", "V Two");

    cy.get("[aria-label='open menu']").click();
    cy.get("div#app").should("contain", "V Two");

    cy.get('[role="option"]')
      .contains("V Two")
      .click();

    cy.get("input").should("have.value", "V Two");

    // ensure the dropdown is closed
    cy.get("div#app").should("not.contain", "V One");
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

    cy.get("[aria-label='open menu']").click();
    cy.get("div#app").should("contain", "V Three");

    cy.get("div.outer-container").click("bottomRight");
    cy.get("div#app").should("not.contain", "V Three");
  });
});
