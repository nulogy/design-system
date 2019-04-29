import React from "react";

import { NDSProvider, NavBar } from "@nulogy/components";

describe("NavBar", () => {
  it("renders", () => {
    const data = {
      primaryMenu: [
        {
          name: "Menu 1",
          items: [
            { name: "Item 1", href: "/" },
          ],
        },
      ],
    };

    cy.mount(
      <NDSProvider>
        <NavBar menuData={ data } />
      </NDSProvider>
    );
  });
});
