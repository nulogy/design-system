import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Alert, Flex } from "../index";
import { Link } from "../Link";

export default {
  title: "Components/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

const alertTypes = ["danger", "informative", "success", "warning"] as const;

export const AlertTypes: Story = {
  render: () => (
    <Flex flexDirection="column" gap="x1">
      {alertTypes.map((type) => (
        <Alert key={type} type={type} title={type}>
          This is an alert with type &quot;{type}&quot;
        </Alert>
      ))}
    </Flex>
  ),
};

export const WithACloseButton: Story = {
  args: {
    isCloseable: true,
    children: "This is an alert with a close button",
  },
  name: "With a close button",
};

export const WithATitle: Story = {
  args: {
    title: "Danger title!",
    type: "danger",
    children: "Danger alert",
  },
  name: "With a title",
};

export const WithALink: Story = {
  args: {
    children: (
      <p>
        An alert with <Link href="/">linked details</Link>.
      </p>
    ),
  },
  name: "With a link",
};
