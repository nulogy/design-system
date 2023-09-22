import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Alert } from "../index";
import { Link } from "../Link";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Danger: Story = {
  args: {
    type: "danger",
    children: <>Danger alert</>,
  },
};

export const Informative: Story = {
  args: {
    children: <>Informative alert</>,
  },
};

export const Success: Story = {
  args: {
    type: "success",
    children: <>Success alert</>,
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    children: <>Warning alert</>,
  },
};

export const WithACloseButton: Story = {
  args: {
    isClosable: true,
    children: <>Warning alert</>,
  },
};

WithACloseButton.story = {
  name: "With a close button",
};

export const WithATitle: Story = {
  args: {
    title: "Danger title!",
    type: "danger",
    children: <>Danger alert</>,
  },
};

export const WithALink: Story = {
  args: {
    children: (
      <>
        An alert with <Link href="/">linked details</Link>.
      </>
    ),
  },
};
