import React from "react";
import { storiesOf } from "@storybook/react";
import Branding from "./Branding";

storiesOf("Branding", module).add("Branding", () => (
  <>
    <Branding />
    <br />
    <br />
    <Branding letterMark />
    <br />
    <br />
    <Branding solutionName="Operational Solution Long Name" />
    <br />
    <br />
    <Branding large />
    <br />
    <br />
    <Branding large solutionName="Operational Solution Long Name" />
    <br />
    <br />
    <Branding large letterMark />
  </>
));
