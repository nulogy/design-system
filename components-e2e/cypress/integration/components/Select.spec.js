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
});
