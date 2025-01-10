import React from "react";
import { Text } from "../Type";
import { VerticalDivider } from ".";

export default {
  title: "Components/VerticalDivider",
  component: VerticalDivider,
};

export const Default = () => (
  <div>
    <Text>Section A</Text>
    <VerticalDivider />
    <Text>Section B</Text>
  </div>
);

export const WithCustomColourAndSpacing = () => (
  <div>
    <Text>Section A</Text>
    <VerticalDivider borderColorpac="darkBlue" my="x1" />
    <Text>Section B</Text>
  </div>
);

export const WithCustomProperties = () => (
  <div>
    <Text>Section A</Text>
    <VerticalDivider
      borderColor="none"
      height="24px"
      backgroundImage="linear-gradient(90deg, hsl(292deg 100% 97%) 0%, hsl(329deg 100% 19%) 17%, hsl(343deg 100% 36%) 33%, hsl(0deg 100% 50%) 50%, hsl(345deg 100% 69%) 67%, hsl(325deg 100% 84%) 83%, hsl(292deg 100% 97%) 100%);"
    />
    <Text>Section B</Text>
  </div>
);
