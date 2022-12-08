import React from "react";
import styled from "styled-components";
import { select } from "@storybook/addon-knobs";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heading1 } from "../Type";
import { Icon } from "../Icon";
import { DropdownButton, DropdownLink } from "../DropdownMenu";
import theme from "../theme";
import { Button } from "../Button";
import { Text } from "../Type";
import { Branding } from "../Branding";
import { Link } from "../Link";
import { Form } from "../Form";
import { Select } from "../Select";
import { Divider } from "../Divider";
import { Box } from "../Box";
import { NavBarWithResizablePrimaryMenuProps } from "./NavBar";
import MenuTriggerButton from "./MenuTriggerButton";
import { BrandedNavBar as NDSBrandedNavBar } from "./index";

const sampleLogo = "http://pigment.github.io/fake-logos/logos/vector/color/auto-speed.svg";

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
});

const BrandedNavBar = (props: NavBarWithResizablePrimaryMenuProps) => (
  <ResetStorybookView>
    <NDSBrandedNavBar {...props} />
    <Heading1 mt="x3" ml="x1">
      Some content
    </Heading1>
  </ResetStorybookView>
);

type ProgressiveNulogyLogoProps = {
  brandingLinkHref: string;
  width: number;
};

function ProgressiveNulogyLogo({ brandingLinkHref, width }: ProgressiveNulogyLogoProps) {
  const { t } = useTranslation();
  const logoType = width >= 1920 ? "wordmark" : "lettermark";
  return (
    <Link
      aria-label={t("Home")}
      as={Link}
      to={brandingLinkHref}
      underline={false}
      lineHeight="1"
      style={{ display: "block" }}
    >
      <Branding size="medium" logoType={logoType} logoColor="blue" />
    </Link>
  );
}

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

export default {
  title: "Components/BrandedNavBar",
};

export const _BrandedNavBar = () => <BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />;

_BrandedNavBar.story = {
  name: "BrandedNavBar",
};

export const WithEverythingTurnedOn = () => {
  const primaryMenu = [
    {
      name: "Analytics",
      items: [
        {
          name: "Historical orders",
          to: "/",
          as: ReactRouterLink,
          isEnabled: true,
        },
        {
          name: "Scorecards",
          to: "/",
          as: ReactRouterLink,
          isEnabled: false,
        },
      ],
    },
    {
      name: "Inventory Management",
      items: [
        {
          name: "Materials overview",
          to: "/",
          as: ReactRouterLink,
          isEnabled: true,
        },
        {
          name: "Inventory reconciliation",
          to: "/",
          as: ReactRouterLink,
          isEnabled: true,
        },
      ],
    },
    {
      render: ({ size, layer }) => {
        return (
          <ReactRouterLink component={Button} to="/" size={size} layer={layer}>
            Invoices
          </ReactRouterLink>
        );
      },
      key: "invoices",
      isEnabled: true,
    },
    {
      render: ({ size, layer }) => (
        <ReactRouterLink to="/" size={size} layer={layer}>
          Items
        </ReactRouterLink>
      ),
      key: "items",
    },
    {
      render: ({ size, layer }) => (
        <ReactRouterLink to="/" size={size} layer={layer}>
          Imports and exports
        </ReactRouterLink>
      ),
      key: "importsAndExports",
    },
  ];

  const adminOrgSwitcher = {
    key: "admin org switcher",
    trigger: () => (
      <Button icon="downArrow" aria-label="admin org switcher">
        <Icon icon="building" />
      </Button>
    ),
    items: [
      {
        key: "organization-item-1",
        render: () => (
          <Form>
            <Select
              options={[
                { label: "option 1", value: "1" },
                { label: "option 2", value: "2" },
              ]}
            />
          </Form>
        ),
      },
    ],
  };

  let secondaryMenu;
  // users usually have a bigger screen, so avoid jitter when the width gets picked up.
  const showingDesktopNav = true;
  if (showingDesktopNav) {
    secondaryMenu = [
      {
        name: "Guided tours",
        render: () => <Button>Guided tours</Button>,
      },
      {
        name: "Help desk",
        render: () => <Button>HelpDesk</Button>,
      },
      {
        name: "Help menu separator",
        render: () => <Divider />,
      },
      {
        ...adminOrgSwitcher,
        isEnabled: true,
      },
      {
        name: "Admin org switcher separator",
        render: () => <Divider />,
        isEnabled: true,
      },
    ];
  } else {
    secondaryMenu = [];
  }
  secondaryMenu = [
    ...secondaryMenu,
    {
      name: "User Menu",
      render: ({ size }) => {
        return size === "medium" ? <Button>User Menu</Button> : <Button>Mobile User Menu</Button>;
      },
    },
  ];

  return (
    <BrowserRouter basename="/">
      <BrandedNavBar
        menuData={{ primaryMenu, secondaryMenu }}
        logo={({ brandingLinkHref, width }: { brandingLinkHref: string; width: number }) => (
          <ProgressiveNulogyLogo brandingLinkHref={brandingLinkHref} width={width} />
        )}
      />
    </BrowserRouter>
  );
};

export const WithACompanyLogo = () => {
  return (
    <BrandedNavBar
      menuData={{ primaryMenu, secondaryMenu }}
      logo={({ brandingLinkHref, width }: { brandingLinkHref: string; width: number }) => (
        <ProgressiveNulogyLogo brandingLinkHref={brandingLinkHref} width={width} />
      )}
    />
  );
};

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
    logo={(brandingLinkHref: string, width: number) => (
      <ProgressiveNulogyLogo brandingLinkHref={brandingLinkHref} width={width} />
    )}
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
      brandingLinkHref="/Home"
      logo={({ brandingLinkHref }: { brandingLinkHref: string }) => (
        <ReactRouterLink to={brandingLinkHref}>
          <img src={sampleLogo} alt="Sample Logo" />
        </ReactRouterLink>
      )}
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
