import React from "react";
import Navigation from "../Navigation";
import { ApplicationFrame, Page } from "../../Layout";
import Sidebar from "../../Layout/Sidebar";
import { Box } from "../../Box";
import { Flex } from "../../Flex";
import { Text } from "../../Type";
import { Button } from "../../Button";
import { Alert } from "../../Alert";
import { NavigationMenuTrigger } from "../components/shared/components";
import NavigationMenuContent from "../components/shared/NavigationMenuContent";
import { Icon } from "../../Icon";
import { Code } from "../../utils/story/code";
import { Input } from "../../Input";

export default {
  title: "Components/Navigation/Navigation Menus",
  parameters: {
    layout: "fullscreen",
  },
};

export const BasicUsage = () => {
  return (
    <ApplicationFrame
      navBar={
        <Navigation
          primaryNavigation={[
            {
              key: "dashboard",
              label: "Dashboard",
              type: "link",
              props: {
                href: "https://nulogy.com/",
              },
            },
            {
              key: "inspector",
              label: "Inspector",
              type: "link",
              props: {
                href: "https://nulogy.com/",
              },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link",
              props: {
                href: "https://nulogy.com/",
              },
            },
            {
              key: "sheets",
              label: "Sheets",
              type: "button",
              props: {
                onClick: () => {
                  alert("You clicked Sheets");
                },
              },
            },
            {
              key: "forms",
              label: "Forms",
              type: "button",
              props: {
                onClick: () => {
                  alert("You clicked Forms");
                },
              },
            },
          ]}
          secondaryNavigation={[
            {
              key: "search",
              type: "button",
              icon: "search",
              tooltip: "Search",
              props: {
                onClick: () => {
                  alert("You clicked Search");
                },
              },
            },
            {
              key: "settings",
              type: "button",
              icon: "settings",
              tooltip: "Settings",
              props: {
                onClick: () => {
                  alert("You clicked Settings");
                },
              },
            },
          ]}
        />
      }
    >
      <Page fullHeight>
        <Flex>
          <Sidebar
            height="100%"
            width="350px"
            hideCloseButton
            isOpen
            title="Story information"
            overlay="hide"
            top="64px"
            bottom="0px"
          >
            <Flex flexDirection="column" gap="x2">
              <Text fontSize="small" color="darkGrey">
                In this example, the <strong>Dashboard</strong>, <strong>Inspector</strong>, and{" "}
                <strong>Reports</strong> are links, and the <strong>Sheets</strong> and <strong>Forms</strong> are
                buttons.
              </Text>
              <Text fontSize="small" color="darkGrey">
                The <strong>Search</strong> and <strong>Settings</strong> buttons are secondary navigation items.
              </Text>
              <Text fontSize="small" color="darkGrey">
                Everything that can be rendered in the <Code>primaryNavigation</Code> (left part of the navigation) can
                also be rendered in the <Code>secondaryNavigation</Code> (right part of the navigation), and vice versa.
              </Text>
            </Flex>
          </Sidebar>
          <Box flex={1} />
        </Flex>
      </Page>
    </ApplicationFrame>
  );
};

export const Separators = () => {
  return (
    <Navigation
      primaryNavigation={[
        {
          key: "dashboard",
          label: "Dashboard",
          type: "link",
        },
        {
          key: "inspector",
          label: "Inspector",
          type: "link",
        },
        {
          key: "inspector-reports-separator",
          type: "separator",
        },
        {
          key: "reports",
          label: "Reports",
          type: "link",
        },
        {
          key: "sheets",
          label: "Sheets",
          type: "button",
        },
      ]}
      secondaryNavigation={[
        {
          key: "search",
          type: "button",
          icon: "search",
          tooltip: "Search",
        },
        {
          key: "search-settings-separator",
          type: "separator",
        },
        {
          key: "settings",
          type: "button",
          icon: "settings",
          tooltip: "Settings",
        },
      ]}
    />
  );
};

export const CustomMenuItems = () => {
  return (
    <ApplicationFrame
      navBar={
        <Navigation
          primaryNavigation={[
            {
              key: "custom-menu-item",
              type: "custom",
              render: () => {
                return (
                  <Text color="red" fontWeight="bold">
                    I am a custom menu item
                  </Text>
                );
              },
            },
            {
              key: "custom-submenu-item-parent",
              type: "button",
              label: "Custom Submenu Items",
              items: [
                {
                  key: "custom-submenu-item-1",
                  type: "custom",
                  render: () => {
                    return <Text color="darkGrey">I am custom submenu item 1</Text>;
                  },
                },
                {
                  key: "custom-submenu-item-2",
                  type: "custom",
                  render: () => {
                    return <Button>I am custom submenu item 2</Button>;
                  },
                },
              ],
            },
            {
              key: "custom-panel-1",
              type: "custom",
              render: () => (
                <>
                  <NavigationMenuTrigger>
                    Custom Panel <Icon icon="downArrow" size="x2" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent padding="none" bg="whiteGrey">
                    I am a custom panel.
                  </NavigationMenuContent>
                </>
              ),
            },
            {
              key: "custom-panel-2",
              type: "custom",
              render: ({ withinSubMenu, withinMobileNav, level }) => (
                <>
                  <NavigationMenuTrigger>
                    Custom Panel 2 <Icon icon="downArrow" size="x2" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent padding="x2">
                    <pre>
                      <Text>withinSubMenu: {withinSubMenu ? "true" : "false"}</Text>
                      <Text>withinMobileNav: {withinMobileNav ? "true" : "false"}</Text>
                      <Text>level: {level}</Text>
                    </pre>
                  </NavigationMenuContent>
                </>
              ),
            },
          ]}
          secondaryNavigation={[
            {
              key: "custom-menu-item",
              type: "custom",
              render: () => {
                return <Input placeholder="Custom menu item too!" iconLeft="search" />;
              },
            },
          ]}
        />
      }
    >
      <Page fullHeight>
        <Alert type="warning">
          Custom menu items should be used sparingly. When used, make sure they remain accessible and use styles that
          are inline with the rest of the navigation. The render function gives you access to <Code>withinSubMenu</Code>
          , <Code>withinMobileNav</Code>, and <Code>level</Code> to style and position the rendered items properly. See
          component documentation for more details.
        </Alert>
      </Page>
    </ApplicationFrame>
  );
};

export const IconsAndLabels = () => {
  return (
    <Navigation
      primaryNavigation={[
        {
          key: "icon-and-label",
          label: "Icon and label",
          icon: "stylusNote",
          type: "button",
        },
        {
          key: "label-only",
          label: "Label only",
          type: "button",
        },
        {
          key: "icon-only",
          icon: "filter",
          type: "button",
          tooltip: "Icon only",
        },
      ]}
      secondaryNavigation={[
        {
          key: "icon-and-label",
          label: "Icon and label",
          icon: "stylusNote",
          type: "button",
        },
        {
          key: "label-only",
          label: "Label only",
          type: "button",
        },
        {
          key: "icon-only",
          icon: "filter",
          type: "button",
          tooltip: "Icon only",
        },
      ]}
    />
  );
};
