import React from "react";
import styled from "styled-components";
import { select } from "@storybook/addon-knobs";
import { Heading1 } from "../Type";
import { Branding } from "../Branding";
import { Link } from "../Link";
import { theme } from "../index";
import BrandLogoContainer from "./BrandLogoContainer";
import { SmallNavBar } from "./index";

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
});

const WrappedSmallNavBar = (props: Partial<SmallNavBarProps>) => (
  <ResetStorybookView>
    <SmallNavBar navBarHeight="56px" {...props} />
    <Heading1 mt="x3" ml="x1">
      Some content
    </Heading1>
  </ResetStorybookView>
);

const primaryMenu = [
  {
    name: "Dashboard",
    items: [{ name: "Items", href: "/" }, { name: "Carriers", href: "/" }, { name: "Only text submenu" }],
  },
  {
    name: "Operations",
    items: [
      {
        name: "Production",
        items: [
          { name: "Dashboard", href: "/" },
          {
            name: "Projects",
            items: [
              { name: "Cycle Counts", href: "/" },
              { name: "Blind Counts", href: "/" },
            ],
          },
          {
            name: "Jobs",
            items: [{ name: "Job 1", href: "/" }],
          },
        ],
      },
    ],
  },
  { name: "Link", href: "/" },
  { name: "Only text" },
];

const secondaryMenu = [
  {
    name: "User@Nulogy.com",
    items: [
      { name: "Profile", href: "/" },
      { name: "Preferences", href: "/" },
      { name: "Logout", href: "/" },
    ],
  },
  {
    name: "Settings",
    items: [
      { name: "Permissions", href: "/" },
      { name: "Manage account", href: "/" },
    ],
  },
];

const smallViewport = {
  viewport: {
    defaultViewport: "small", // for some reason this has to match the viewport key, NOT the name!
  },
  chromatic: { viewports: [parseInt(theme.breakpoints.small)] },
};

export default {
  title: "Components/BrandedNavBar/SmallNavBar",
  parameters: smallViewport,
};

export const _SmallNavBar = () => <WrappedSmallNavBar menuData={{ primaryMenu, secondaryMenu }} />;

export const SmallNavBarOpen = () => <WrappedSmallNavBar menuData={{ primaryMenu, secondaryMenu }} defaultOpen />;

export const WithALogo = () => (
  <WrappedSmallNavBar
    menuData={{ primaryMenu, secondaryMenu }}
    logo={
      <Link aria-label="Home" href="/" underline={false} style={{ display: "block" }}>
        <Branding size="medium" logoType="wordmark" logoColor="blue" />
      </Link>
    }
  />
);

export const WithALogoOpen = () => (
  <WrappedSmallNavBar
    menuData={{ primaryMenu, secondaryMenu }}
    defaultOpen
    logo={
      <Link aria-label="Home" href="/" underline={false} style={{ display: "block" }}>
        <Branding size="medium" logoType="wordmark" logoColor="blue" />
      </Link>
    }
  />
);
export const WithABrandLogoContainerLogo = () => (
  <WrappedSmallNavBar menuData={{ primaryMenu, secondaryMenu }} logo={<BrandLogoContainer brandingLinkHref="/" />} />
);

export const WithANulogyLogoAndAppName = () => (
  <WrappedSmallNavBar
    menuData={{ primaryMenu, secondaryMenu }}
    subtext="Quality control"
    showNulogyLogo={true}
    defaultOpen
  />
);

export const WithEnvironmentBanner = () => (
  <WrappedSmallNavBar
    menuData={{ primaryMenu, secondaryMenu }}
    environment={select("environment", ["training", "development"], "training")}
  />
);
