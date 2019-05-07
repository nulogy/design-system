import React from "react";

import { NDSProvider, NavBar } from "@nulogy/components";

describe("NavBar", () => {
  describe("the desktop menu", () => {
    it("renders", () => {
      cy.viewport("macbook-13");
      const data = {
        primaryMenu: [
          {
            name: "Menu 1",
            items: [{ name: "Item 1", href: "/" }]
          }
        ]
      };

      cy.mount(
        <NDSProvider>
          <>
            <NavBar menuData={data} />
          </>
        </NDSProvider>
      );
    });
  });

  describe("the mobile menu", () => {
    it("renders", () => {
      cy.viewport("ipad-mini");
      const data = {
        primaryMenu: [
          {
            name: "Menu 1",
            items: [{ name: "Item 1", href: "/" }]
          }
        ]
      };

      cy.mount(
        <NDSProvider>
          <NavBar menuData={data} />
        </NDSProvider>
      );
    });
  });
});
