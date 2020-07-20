import React from "react";
import { storiesOf } from "@storybook/react";
import { Heading1 } from "../Type";
import { TruncatedText } from ".";

storiesOf("TruncatedText", module)
  .add("TruncatedText", () => <TruncatedText>Special instructions are provided for the shipment</TruncatedText>)
  .add("without tooltip", () => (
    <TruncatedText showTooltip={false}>Special instructions are provided for the shipment</TruncatedText>
  ))
  .add("under max characters", () => <TruncatedText>Item is available</TruncatedText>)
  .add("with max characters 10", () => <TruncatedText maxCharacters={10}>Item is available</TruncatedText>)
  .add("with custom truncation indicator", () => (
    <TruncatedText indicator=" + 2...">Special instructions are provided for the shipment</TruncatedText>
  ))
  .add("as title", () => (
    <TruncatedText element={<Heading1 />}>Special instructions are provided for the shipment</TruncatedText>
  ));
