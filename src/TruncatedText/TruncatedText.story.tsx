import React from "react";
import { Heading1 } from "../Type";
import { Box } from "../Box";
import { TruncatedText } from ".";

export default {
  title: "Components/TruncatedText",
};

export const _TruncatedText = () => (
  <TruncatedText>
    Special instructions are provided for the shipment
  </TruncatedText>
);

_TruncatedText.story = {
  name: "TruncatedText",
};

export const WithoutTooltip = () => (
  <TruncatedText showTooltip={false}>
    Special instructions are provided for the shipment
  </TruncatedText>
);

WithoutTooltip.story = {
  name: "without tooltip",
};

export const UnderMaxCharacters = () => (
  <TruncatedText>Item is available</TruncatedText>
);

UnderMaxCharacters.story = {
  name: "under max characters",
};

export const WithMaxCharacters10 = () => (
  <TruncatedText maxCharacters={10}>Item is available</TruncatedText>
);

WithMaxCharacters10.story = {
  name: "with max characters 10",
};

export const WithCustomTruncationIndicator = () => (
  <TruncatedText indicator=" + 2...">
    Special instructions are provided for the shipment
  </TruncatedText>
);

WithCustomTruncationIndicator.story = {
  name: "with custom truncation indicator",
};

export const AsTitle = () => (
  <TruncatedText element={<Heading1 />}>
    Special instructions are provided for the shipment
  </TruncatedText>
);

AsTitle.story = {
  name: "as title",
};

export const FullWidth = () => (
  <Box width="200px">
    <TruncatedText fullWidth>
      Special instructions are truncated because there is not enough space to
      show them.
    </TruncatedText>
    <TruncatedText fullWidth>Instructions fit here.</TruncatedText>
  </Box>
);

FullWidth.story = {
  name: "full width",
};

export const WithoutChildren = () => (
  <Box>
    <Heading1>
      No text should appear after this sentence, neither should the page crash.
    </Heading1>
    <TruncatedText>{null}</TruncatedText>
    <TruncatedText>{undefined}</TruncatedText>
    <TruncatedText />
  </Box>
);

WithoutChildren.story = {
  name: "Without children",
};
