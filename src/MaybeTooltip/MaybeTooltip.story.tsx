import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../Type";
import { Box } from "../Box";
import MaybeTooltip from "./MaybeTooltip";

export default {
  title: "Components/MaybeTooltip",
  component: MaybeTooltip,
  render: (args) => (
    <Box width="100px">
      <MaybeTooltip {...args} />
    </Box>
  ),
} satisfies Meta<typeof MaybeTooltip>;

type Story = StoryObj<typeof MaybeTooltip>;

export const Default: Story = {
  args: {
    children: <Text>Hello</Text>,
    tooltip: "This is a tooltip",
    showTooltip: true,
  },
};

export const WithNoTooltip: Story = {
  args: {
    children: <Text>Hello</Text>,
    showTooltip: false,
  },
};
