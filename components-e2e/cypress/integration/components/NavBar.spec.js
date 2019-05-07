import React from "react";

import { NDSProvider, NavBar } from "@nulogy/components";

describe("NavBar", () => {
  context("when in desktop mode", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
      window.innerWidth = 1280;
      window.innerHeight = 800;
    });

    it("can be navigated using the keyboard", () => {
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

  context("when in mobile mode", () => {
    before(() => {
      cy.viewport("ipad-mini");
      window.innerWidth = 768;
      window.innerHeight = 1024;
    });

    it("renders", () => {
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
