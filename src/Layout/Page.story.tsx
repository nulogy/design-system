import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ApplicationFrame, Breadcrumbs, Link, Heading2, Text, Page, StatusIndicator, Navigation } from "..";

export default {
  title: "Components/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const _Page: Story = {
  args: {
    breadcrumbs: (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    ),
    title: "Materials Overview",
    headerContent: <StatusIndicator type="informative">Beta</StatusIndicator>,
    children: (
      <Text fontFamily="mono" fontSize="small">
        content
      </Text>
    ),
  },
};

export const NoPageTitle: Story = {
  render: (args) => (
    <ApplicationFrame navBar={<Navigation />}>
      <Page {...args} />
    </ApplicationFrame>
  ),
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
  render: (args) => (
    <ApplicationFrame navBar={<Navigation />} height="100vh">
      <Page {...args} />
    </ApplicationFrame>
  ),
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

export const NoBackground: Story = {
  args: {
    title: "Materials Overview",
    breadcrumbs: (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    ),
  },
};

export const WithFullHeight: Story = {
  render: (args) => (
    <ApplicationFrame navBar={<Navigation />}>
      <Page {...args} />
    </ApplicationFrame>
  ),
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

export const WithReactNodeAsTitle: Story = {
  args: {
    title: <b>I am a title</b>,
    children: <Text>I am main content.</Text>,
  },
};
