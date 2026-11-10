import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { expect, within } from "storybook/test";
import { Link } from "../index";

export default {
  title: "Components/Link",
  component: Link,
} satisfies Meta<typeof Link>;

type Story = StoryObj<typeof Link>;

export const _Link: Story = {
  render: () => <Link href="http://nulogy.design">Link</Link>,
  name: "Link ",
};

export const WithCustomFontSize: Story = {
  render: () => (
    <Link href="http://nulogy.design" fontSize="small">
      Link
    </Link>
  ),

  name: "with custom font size",
};

export const WithoutUnderline: Story = {
  render: () => (
    <Link underline={false} href="http://nulogy.design">
      Link
    </Link>
  ),

  name: "Without underline",
};

export const WithADifferentColor: Story = {
  render: () => (
    <Link color="black" hover="red" href="http://nulogy.design">
      Link
    </Link>
  ),

  name: "With a different color",
};

export const WithADifferentFontSize: Story = {
  render: () => (
    <Link fontSize="large" href="http://nulogy.design">
      Link
    </Link>
  ),
};

export const AsAButton: Story = {
  render: () => <Link as="button">Link</Link>,
  name: "As a <button>",
};

export const _ReactRouterLink: Story = {
  render: () => (
    <BrowserRouter>
      <Link as={ReactRouterLink} to="/place">
        Link
      </Link>
    </BrowserRouter>
  ),

  name: "with react router",
};

const PropsProbe = ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
  <a
    href={to}
    {...props}
    data-received-props={Object.keys({ to, children, ...props })
      .sort()
      .join(",")}
  >
    {children}
  </a>
);

export const WithACustomAsComponent: Story = {
  render: () => (
    <Link
      as={PropsProbe}
      to="/place"
      target="_blank"
      // `state` isn't in LinkProps; spread it to mimic an as-component prop like React Router's
      {...{ state: { from: "story" } }}
      underline={false}
      hover="red"
      variant="desktop"
      p="x1"
      color="darkBlue"
    >
      Link
    </Link>
  ),
  name: "with a custom as component",
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Link" });
    const receivedProps = link.getAttribute("data-received-props")?.split(",");

    await expect(receivedProps).toEqual(expect.arrayContaining(["to", "target", "state", "className", "children"]));
    for (const prop of ["underline", "hover", "variant", "p", "color"]) {
      await expect(receivedProps).not.toContain(prop);
    }
  },
};

export const WithAppTag: Story = {
  render: () => (
    <Link href="#production-scheduling" forApp="production-scheduling">
      POLI-120392
    </Link>
  ),

  name: "With AppTag",
};

export const OpenInNewTab: Story = {
  render: () => (
    <Link href="#production-scheduling" openInNewTab>
      POLI-120392
    </Link>
  ),
};

export const OpenInNewTabWithAppTag: Story = {
  render: () => (
    <Link href="#production-scheduling" forApp="production-scheduling" openInNewTab>
      POLI-120392
    </Link>
  ),

  name: "Open in new tab with AppTag",
};
