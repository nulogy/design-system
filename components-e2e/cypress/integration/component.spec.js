import React from "react";
import ReactDOM from "react-dom";

import { NDSProvider, Select } from "@nulogy/components";

it("renders a react component", () => {
  cy.visit("cypress/index.html");
  cy.contains("#test", "test goes here");

  // React component, you can use JSX
  const Welcome = props => <p onClick={ props.onClick }>Hello, {props.name}</p>;

  const onClick = cy.stub().as("click");
  cy.get("#test").then(el$ => {
    const welcomeGleb = <Welcome name="Gleb" onClick={ onClick } />;
    ReactDOM.render(welcomeGleb, el$[0]);
  });

  cy.log("Testing injected element by clicking on it");
  // notice that we are using text that is created by `welcomeGleb` element
  cy.contains("Hello, Gleb").click().click();
  cy.get("@click").should("have.been.calledTwice");
});

it("renders an NDS component", () => {
  cy.visit("cypress/index.html");
  cy.contains("#test", "test goes here");

  const options = [
    { value: "v1", label: "V One" },
    { value: "v2", label: "V Two" },
    { value: "v3", label: "V Three" },
  ];

  cy.get("#test").then(el$ => {
    const someJSX = (
      <NDSProvider>
        <Select options={ options } />
      </NDSProvider>
    );

    ReactDOM.render(someJSX, el$[0]);
  });

  cy.contains("#test", "V One");
});
