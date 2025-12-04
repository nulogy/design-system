import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Link } from "../Link";
import { ApplicationFrame, Navigation, Page, Breadcrumbs, Heading2, Text } from "..";

export default {
  title: "Components/Page/Within an ApplicationFrame",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <ApplicationFrame navBar={<Navigation />} height="100vh">
      <Page {...args} />
    </ApplicationFrame>
  ),
} satisfies Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const NoPageTitle: Story = {
  args: {
    breadcrumbs: (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    ),
    children: (
      <Text fontFamily="mono" fontSize="small">
        content
      </Text>
    ),
  },
};

export const NoBreadcrumbs: Story = {
  args: {
    title: "Materials Overview",
    children: (
      <>
        <Heading2>Overview</Heading2>
        <Text>I am main content.</Text>
      </>
    ),
  },
};

export const WithFullHeight: Story = {
  args: {
    title: "Materials Overview",
    fullHeight: true,
    breadcrumbs: (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    ),
    children: <Text>I am main content.</Text>,
  },
};
