import React from "react";
import { Heading1 } from "../Type";
import { TruncatedText } from ".";

export default {
  title: "Components/TruncatedText"
};

export const _TruncatedText = () => <TruncatedText>Special instructions are provided for the shipment</TruncatedText>;

_TruncatedText.story = {
  name: "TruncatedText"
};

export const WithoutTooltip = () => (
  <TruncatedText showTooltip={false}>Special instructions are provided for the shipment</TruncatedText>
);

WithoutTooltip.story = {
  name: "without tooltip"
};

export const UnderMaxCharacters = () => <TruncatedText>Item is available</TruncatedText>;

UnderMaxCharacters.story = {
  name: "under max characters"
};

export const WithMaxCharacters10 = () => <TruncatedText maxCharacters={10}>Item is available</TruncatedText>;

WithMaxCharacters10.story = {
  name: "with max characters 10"
};

export const WithCustomTruncationIndicator = () => (
  <TruncatedText indicator=" + 2...">Special instructions are provided for the shipment</TruncatedText>
);

WithCustomTruncationIndicator.story = {
  name: "with custom truncation indicator"
};

export const AsTitle = () => (
  <TruncatedText element={<Heading1 />}>Special instructions are provided for the shipment</TruncatedText>
);

AsTitle.story = {
  name: "as title"
};

export const WithSpace = () => (
  <TruncatedText mt="x2" p="x1">
    Special instructions are provided for the shipment
  </TruncatedText>
);
