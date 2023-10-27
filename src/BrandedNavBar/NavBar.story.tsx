import React from "react";
import styled from "styled-components";
import { select } from "@storybook/addon-knobs";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { Heading1 } from "../Type";
import { Icon } from "../Icon";
import { DropdownButton, DropdownLink } from "../DropdownMenu";
import theme from "../theme";
import { Button } from "../Button";
import { Text } from "../Type";
import { BrandedNavBar as NDSBrandedNavBar } from "./index";
import { devDependencies } from "../../package.json";

const sampleLogo = "http://pigment.github.io/fake-logos/logos/vector/color/auto-speed.svg";

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
});

const BrandedNavBar = (props) => (
  <ResetStorybookView>
    <NDSBrandedNavBar {...props} />
    <Heading1 mt="x3" ml="x1">
      <pre>styled-components version: {devDependencies["styled-components"]}</pre>
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
              { name: "Preferences", href: "/" },
              { name: "Permissions", href: "/" },
              { name: "Manage account", href: "/" },
              { name: "More Link", href: "/" },
              { name: "One More Link", href: "/" },
              { name: "Test Link", href: "/" },
              { name: "Hello", href: "/" },
              { name: "World", href: "/" },
              { name: "Great!", href: "/" },
              { name: "Example", href: "/" },
              { name: "More Example", href: "/" },
            ],
          },
          {
            name: "Jobs",
            items: [{ name: "Job 1", href: "/" }],
          },
          { name: "Profile", href: "/" },
          { name: "Preferences", href: "/" },
          { name: "Logout", href: "/" },
          { name: "Settings", href: "/" },
          { name: "Permissions", href: "/" },
          { name: "Manage account", href: "/" },
          { name: "More Link", href: "/" },
          { name: "One More Link", href: "/" },
          { name: "Test Link", href: "/" },
          { name: "Hello", href: "/" },
          { name: "World", href: "/" },
          { name: "Great!", href: "/" },
          { name: "Example", href: "/" },
          { name: "More Example", href: "/" },
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

const secondaryMenuWithIcon = [
  {
    name: "Account Information: User@Nulogy.com",
    items: [
      { name: "Profile", href: "/" },
      { name: "Preferences", href: "/" },
      { name: "Logout", href: "/" },
    ],
  },
  {
    name: <Icon icon="settings" />,
    ariaLabel: "Settings",
    key: "Settings",
    items: [
      { name: "Permissions", href: "/" },
      { name: "Manage account", href: "/" },
    ],
  },
  {
    name: <Icon icon="chatBubble" />,
    ariaLabel: "chat",
    key: "chat",
    items: [
      { name: "Permissions", href: "/" },
      { name: "Manage account", href: "/" },
    ],
  },
];

const menuData = { primaryMenu, secondaryMenu };
export default {
  title: "Components/BrandedNavBar",
};

export const _BrandedNavBar = () => <BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />;

_BrandedNavBar.story = {
  name: "BrandedNavBar",
};

export const WithACompanyLogo = () => <BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} logoSrc={sampleLogo} />;

WithACompanyLogo.story = {
  name: "With a company logo",
};

export const WithAppName = () => <BrandedNavBar subtext="Quality Control" menuData={{ primaryMenu, secondaryMenu }} />;

WithAppName.story = {
  name: "With app name",
};

export const WithACompanyLogoAndAppName = () => (
  <BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} subtext="Quality control" logoSrc={sampleLogo} />
);

WithACompanyLogoAndAppName.story = {
  name: "With a company logo and app name",
};

export const WithEnvironmentBanner = () => (
  <BrandedNavBar
    menuData={{ primaryMenu, secondaryMenu }}
    subtext="Quality control"
    logoSrc={sampleLogo}
    environment={select("environment", ["training", "development"], "training")}
  />
);

WithEnvironmentBanner.story = {
  name: "with environment banner",
};

export const WithIcon = () => (
  <BrandedNavBar
    menuData={{
      primaryMenu: primaryMenu,
      secondaryMenu: secondaryMenuWithIcon,
    }}
  />
);

WithIcon.story = {
  name: "With icon",
};

export const WithPrimaryAndSecondarySubMenus = () => (
  <BrandedNavBar
    menuData={{
      primaryMenu: [
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
      ],
      secondaryMenu: [
        {
          name: "Settings",
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
      ],
    }}
  />
);

export const WithExternalLinks = () => (
  <BrandedNavBar
    menuData={{
      primaryMenu: [
        {
          name: "Top level open in new tab link",
          href: "https://www.google.com",
          openInNew: true,
        },
        {
          name: "Top level open in same tab link",
          href: "https://www.google.com",
          openInNew: false,
        },
        {
          name: "Dropdown",
          items: [
            {
              name: "New tab link in dropdown",
              href: "https://www.google.com",
              openInNew: true,
            },
            {
              name: "Same tab link in dropdown",
              href: "https://www.google.com",
              openInNew: false,
            },
            {
              name: "Sub Menu",
              items: [
                {
                  name: "New tab link in submenu",
                  href: "https://www.google.com",
                  openInNew: true,
                },
                {
                  name: "Same tab link in submenu",
                  href: "https://www.google.com",
                  openInNew: false,
                },
              ],
            },
          ],
        },
      ],
    }}
  />
);

const primaryMenuReactRouter = [
  {
    name: "Dashboard",
    items: [
      {
        name: "Customers",
        to: "/customers",
        as: ReactRouterLink,
      },
      {
        name: "Invoices",
        items: [
          {
            name: "new invoice",
            to: "/new",
            as: ReactRouterLink,
          },
        ],
      },
      { name: "Projects", href: "/" },
      { name: "Items", href: "/" },
      { name: "Vendors", href: "/" },
      { name: "Carriers", href: "/" },
    ],
  },

  {
    name: "Inspector",
    items: [
      { name: "Dashboard", href: "/" },
      { name: "Moves", href: "/" },
      { name: "Pick Lists", href: "/" },
      { name: "Receive Orders", href: "/" },
      { name: "Receipts", href: "/" },
      { name: "Ship Orders", href: "/" },
      { name: "Shipments", href: "/" },
      { name: "Item Lists", href: "/" },
      { name: "Cycle Counts", href: "/" },
      { name: "Blind Counts", href: "/" },
      { name: "Inbound Stock Transfer Orders", href: "/" },
      { name: "Inbound Stock Transfers", href: "/" },
      { name: "Outbound Stock Transfers", href: "/" },
    ],
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
            items: [
              { name: "Job 1", href: "/" },
              { name: "Job 2", href: "/" },
            ],
          },
        ],
      },
      { name: "Item cart", href: "/" },
      { name: "Inventory", href: "/" },
    ],
  },
  { name: "Link", to: "/Link" },
];

export const WithReactRouter = () => (
  <BrowserRouter basename="/">
    <BrandedNavBar
      brandingLinkTo="/Home"
      brandingLinkComponent={ReactRouterLink}
      menuData={{
        primaryMenu: primaryMenuReactRouter,
        secondaryMenu: secondaryMenuWithIcon,
      }}
    />
  </BrowserRouter>
);

WithReactRouter.story = {
  name: "With react router",
};

export const WithHamburgerMenu = () => {
  return <BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} defaultOpen />;
};
WithHamburgerMenu.parameters = {
  viewport: {
    defaultViewport: "small", // for some reason this has to match the viewport key, NOT the name!
  },
  chromatic: { viewports: [parseInt(theme.breakpoints.small)] },
};

const customPrimaryMenu = [
  {
    name: "Submenu",
    items: [
      { name: "Submenu link", href: "/" },
      {
        name: "Custom submenu HTML Link",
        render: () => <a href="/">Submenu Raw HTML Link</a>,
      },
      {
        name: "Custom submenu DropdownLink",
        render: () => <DropdownLink href="/">DropdownLink</DropdownLink>,
      },
      {
        name: "Custom submenu DropdownButton",
        render: ({ layer }) => <DropdownButton>DropdownButton at layer {layer}</DropdownButton>,
      },
    ],
  },
  { name: "Menu link", href: "/" },
  {
    name: "Custom Menu HTML Link",
    render: () => <a href="/">Menu Raw HTML Link</a>,
  },
];
export const CustomRendering = () => <BrandedNavBar menuData={{ primaryMenu: customPrimaryMenu, secondaryMenu }} />;

export const CustomRenderingInHamburger = () => (
  <BrandedNavBar menuData={{ primaryMenu: customPrimaryMenu, secondaryMenu }} defaultOpen />
);
CustomRenderingInHamburger.parameters = {
  viewport: {
    defaultViewport: "small", // for some reason this has to match the viewport key, NOT the name!
  },
  chromatic: { viewports: [parseInt(theme.breakpoints.small)] },
};

const primaryMenuWithCustomTriggers = [
  {
    name: "Menu",
    trigger: ({ size, layer }) => (
      <Button>
        Custom menu trigger for {size}. layer: {layer}
      </Button>
    ),
    items: [
      { name: "Menu 1 link", href: "/" },
      {
        name: "Submenu 1 (pass-through to hamburger default)",
        trigger: ({ size, defaultRender, layer }) =>
          size === "medium" ? <Button>Custom submenu trigger. layer: {layer}</Button> : defaultRender(),
        items: [{ name: "Submenu 1 link", href: "/" }],
      },
      {
        name: "Submenu 2",
        trigger: ({ size, openMenu, closeMenu, defaultRender, layer }) => {
          return size === "medium" ? (
            <Button onMouseEnter={openMenu} onMouseLeave={closeMenu}>
              Custom submenu trigger w/ open on hover. layer: {layer}
            </Button>
          ) : (
            defaultRender()
          );
        },
        items: [{ name: "Submenu 2 link", href: "/" }],
      },
      {
        name: "Submenu 3 (pass-through to desktop default)",
        trigger: ({ size, defaultRender, layer }) => {
          return size === "small" ? (
            <Text color="black" pl="x6">
              Custom submenu hamburger heading 2. layer: {layer}
            </Text>
          ) : (
            defaultRender()
          );
        },
        items: [{ name: "Submenu 3 link", href: "/" }],
      },
    ],
  },
];
export const CustomMenuTriggers = () => (
  <BrandedNavBar menuData={{ primaryMenu: primaryMenuWithCustomTriggers, secondaryMenu }} />
);

export const CustomMenuTriggersInHamburger = () => (
  <BrandedNavBar menuData={{ primaryMenu: primaryMenuWithCustomTriggers, secondaryMenu }} defaultOpen />
);
CustomMenuTriggersInHamburger.parameters = {
  viewport: {
    defaultViewport: "small", // for some reason this has to match the viewport key, NOT the name!
  },
  chromatic: { viewports: [parseInt(theme.breakpoints.small)] },
};
