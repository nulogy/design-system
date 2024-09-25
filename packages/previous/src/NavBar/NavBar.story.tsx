import React from "react";
import styled from "styled-components";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { NavBar as NDSNavBar } from "../index";
import { Icon } from "../Icon";

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
});

const NavBar = (props) => (
  <ResetStorybookView>
    <NDSNavBar {...props} />
  </ResetStorybookView>
);

const primaryMenu = [
  {
    name: "Dashboard",
    items: [
      { name: "Customers", href: "/" },
      { name: "Invoices", href: "/" },
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
  { name: "Link", href: "/" },
];

const primaryMenuCustomLinks = [
  {
    name: "Dashboard",
    items: [
      {
        name: "Invoices",
        items: [
          {
            name: "NormalLink",
            href: "/",
          },
          {
            name: "CustomLink",
            render: () => <a href="/">CustomLink</a>,
          },
        ],
      },
      {
        name: "Projects",
        href: "/",
      },
      {
        name: "Customers",
        render: () => <a href="/">Customers CustomLink</a>,
      },
    ],
  },
  {
    name: "Inspector",
    href: "/",
  },
  {
    name: "Custom Link",
    render: () => <a href="/">Custom Link</a>,
  },
];

const primaryMenuText = [
  {
    name: "Dashboard",
    items: [
      {
        name: "MenuTrigger",
        items: [
          {
            name: "NormalLink",
            href: "/",
          },
          {
            name: "Just Text",
          },
        ],
      },
      {
        name: "NormalLink",
        href: "/",
      },
      {
        name: "Just Text",
      },
    ],
  },
  {
    name: "NormalLink",
    href: "/",
  },
  {
    name: "Just Text",
  },
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

const secondaryMenuCustomLinks = [
  {
    name: "User@Nulogy.com",
    items: [
      { name: "Profile", href: "/" },
      { name: "Preferences", href: "/" },
      { name: "Logout", href: "/" },
    ],
  },
  {
    name: <Icon icon="settings" />,
    ariaLabel: "Settings",
    items: [
      { name: "Permissions", href: "/" },
      { name: "Manage account", href: "/" },
    ],
  },
];

const search = {
  onSubmit: () => {},
};

export default {
  title: "Components/NavBar",
};

export const _NavBar = () => <NavBar menuData={{ primaryMenu, secondaryMenu, search }} />;

_NavBar.story = {
  name: "NavBar",
};

export const WithoutSearch = () => <NavBar menuData={{ primaryMenu, secondaryMenu }} />;

WithoutSearch.story = {
  name: "Without search",
};

export const WithoutSecondaryMenu = () => <NavBar menuData={{ primaryMenu, search }} />;

WithoutSecondaryMenu.story = {
  name: "Without secondary menu",
};

export const WithoutSearchAndSecondaryMenu = () => <NavBar menuData={{ primaryMenu }} />;

WithoutSearchAndSecondaryMenu.story = {
  name: "Without search and secondary menu",
};

export const WithoutSearchAndPrimaryMenu = () => <NavBar menuData={{ secondaryMenu }} />;

WithoutSearchAndPrimaryMenu.story = {
  name: "Without search and primary menu",
};

export const WithBrandingOnly = () => <NavBar menuData={{}} />;

WithBrandingOnly.story = {
  name: "With branding only",
};

export const WithCustomLinkComponents = () => (
  <NavBar
    menuData={{
      primaryMenu: primaryMenuCustomLinks,
      secondaryMenu: secondaryMenuCustomLinks,
      search,
    }}
  />
);

WithCustomLinkComponents.story = {
  name: "With custom link components",
};

export const WithTextInTheMenu = () => <NavBar menuData={{ primaryMenu: primaryMenuText }} />;

WithTextInTheMenu.story = {
  name: "With text in the menu",
};

export const WithSubtext = () => (
  <NavBar subtext="Logo Subtext" menuData={{ primaryMenu: primaryMenuCustomLinks, search }} />
);

WithSubtext.story = {
  name: "With subtext",
};

export const WithAlternativeBrandingLink = () => (
  <NavBar brandingLinkHref="/portal" menuData={{ primaryMenu: primaryMenuCustomLinks }} />
);

WithAlternativeBrandingLink.story = {
  name: "With alternative branding link",
};

export const WithAlternateThemeColor = () => (
  <NavBar subtext="Logo Subtext" menuData={{ primaryMenu: primaryMenuCustomLinks }} themeColor="white" />
);

WithAlternateThemeColor.story = {
  name: "With alternate themeColor",
};

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
    <NavBar
      brandingLinkTo="/Home"
      brandingLinkComponent={ReactRouterLink}
      menuData={{
        primaryMenu: primaryMenuReactRouter,
        secondaryMenu: secondaryMenu,
      }}
    />
  </BrowserRouter>
);

WithReactRouter.story = {
  name: "With react router",
};
