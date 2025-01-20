import React from "react";
import { Text } from "../Type";
import { VerticalDivider } from ".";

export default {
  title: "Components/VerticalDivider",
  component: VerticalDivider,
};

export const Default = () => (
  <div>
    <Text display="inline">Section A</Text>
    <VerticalDivider />
    <Text display="inline">Section B</Text>
  </div>
);

export const WithCustomColourAndSpacing = () => (
  <div>
    <Text display="inline">Section A</Text>
    <VerticalDivider color="darkBlue" mx="x3" />
    <Text display="inline">Section B</Text>
  </div>
);
