import React from "react";
import { useTheme } from "styled-components";
import Navigation from "../Navigation";
import { Text } from "../../Type";
import type { MenuItems } from "../types";
import { ApplicationFrame } from "../../Layout";
import { Page } from "../../Layout/Page";
import { Code } from "../../utils/story/code";
import { NAVIGATION_DEFAULT_BREAKPOINT_THEME_KEY } from "../components/shared/constants";

export default {
  title: "Components/Navigation/Mobile Visibility",
  parameters: {
    layout: "fullscreen",
  },
};

const baseMenuItems = [
  { key: "home", label: "Home", type: "link", props: { href: "#" } },
  { key: "products", label: "Products", type: "button" },
  { key: "about", label: "About Us", type: "link", props: { href: "#" } },
  { key: "contact", label: "Contact", type: "button" },
] satisfies MenuItems;

const StoryLayout = ({ children, description }: { children: React.ReactNode; description?: React.ReactNode }) => {
  const { breakpoints } = useTheme();
  return (
    <ApplicationFrame navBar={children}>
      <Page>
        {description && <Text mb="x2">{description}</Text>}
        <Text mb="x2" color="darkGrey" fontSize="small">
          Resize the window to the default mobile breakpoint width (
          {breakpoints[NAVIGATION_DEFAULT_BREAKPOINT_THEME_KEY]}) to observe the mobile navigation behavior.
        </Text>
      </Page>
    </ApplicationFrame>
  );
};

export const DefaultBehavior = () => (
  <StoryLayout
    description={
      <>
        Default behavior: Items without <Code>mobileVisibility</Code> set will appear in the mobile navigation menu.
      </>
    }
  >
    <Navigation
      primaryNavigation={[
        { ...baseMenuItems[0], label: "Home (Default)" },
        { ...baseMenuItems[1], label: "Products (Default)" },
      ]}
      secondaryNavigation={[
        {
          key: "settings",
          label: "Settings (Default)",
          icon: "settings",
          type: "button",
        },
      ]}
    />
  </StoryLayout>
);

export const ItemInNavigationBar = () => (
  <StoryLayout
    description={
      <>
        Items with <Code>mobileVisibility: &quot;navigationBar&quot;</Code> will appear directly in the mobile
        navigation bar.
      </>
    }
  >
    <Navigation
      primaryNavigation={[
        { ...baseMenuItems[0], label: "Home (Menu)" },
        {
          key: "search",
          label: "Search",
          type: "button",
          icon: "search",
          mobileVisibility: "navigationBar",
          props: { "aria-label": "Search" },
        },
        { ...baseMenuItems[1], label: "Products (Menu)" },
      ]}
      secondaryNavigation={[
        {
          key: "notifications",
          label: "Notifications",
          icon: "chatBubble",
          type: "button",
          mobileVisibility: "navigationBar",
          props: { "aria-label": "Notifications" },
        },
        {
          key: "help",
          label: "Help",
          icon: "help",
          type: "button",
          mobileVisibility: "navigationMenu",
        },
      ]}
    />
  </StoryLayout>
);

export const ItemInNavigationMenu = () => (
  <StoryLayout
    description={
      <>
        Items with <Code>mobileVisibility: &quot;navigationMenu&quot;</Code> will appear inside the collapsible mobile
        menu. This is also the default behavior if the prop is not set.
      </>
    }
  >
    <Navigation
      primaryNavigation={[
        {
          ...baseMenuItems[0],
          label: "Home (Explicit Menu)",
          mobileVisibility: "navigationMenu",
        },
        {
          ...baseMenuItems[1],
          label: "Products (Explicit Menu)",
          mobileVisibility: "navigationMenu",
        },
      ]}
      secondaryNavigation={[
        {
          key: "profile",
          label: "Profile",
          icon: "user",
          type: "button",
          mobileVisibility: "navigationMenu",
        },
      ]}
    />
  </StoryLayout>
);

export const ItemHiddenOnMobile = () => (
  <StoryLayout
    description={
      <>
        Items with <Code>mobileVisibility: &quot;hidden&quot;</Code> will not be visible on mobile viewports.
      </>
    }
  >
    <Navigation
      primaryNavigation={[
        { ...baseMenuItems[0], label: "Home (Visible)" },
        {
          ...baseMenuItems[1],
          label: "Products (Hidden)",
          mobileVisibility: "hidden",
        },
        { ...baseMenuItems[2], label: "About (Visible)" },
      ]}
      secondaryNavigation={[
        {
          key: "admin",
          label: "Admin Panel (Hidden)",
          icon: "settings",
          type: "button",
          mobileVisibility: "hidden",
        },
        {
          key: "support",
          label: "Support (Visible)",
          icon: "chatBubble",
          type: "button",
        },
      ]}
    />
  </StoryLayout>
);

export const MixedVisibility = () => (
  <StoryLayout
    description={
      <>
        A mix of items with different <Code>mobileVisibility</Code> settings to demonstrate various behaviors
        simultaneously.
      </>
    }
  >
    <Navigation
      primaryNavigation={[
        {
          key: "dashboard",
          label: "Dashboard",
          type: "link",
          props: { href: "#" },
          mobileVisibility: "navigationMenu",
        },
        {
          key: "quick-action",
          label: "Quick Action",
          icon: "add",
          type: "button",
          mobileVisibility: "navigationBar",
          props: { "aria-label": "Quick Action" },
        },
        {
          key: "reports",
          label: "Reports",
          type: "button",
          mobileVisibility: "hidden",
        },
        {
          key: "docs",
          label: "Documentation",
          type: "link",
          props: { href: "#" },
        },
      ]}
      secondaryNavigation={[
        {
          key: "alerts",
          label: "Alerts",
          icon: "warning",
          type: "button",
          mobileVisibility: "navigationBar",
          props: { "aria-label": "Alerts" },
        },
        {
          key: "preferences",
          label: "Preferences",
          icon: "settings",
          type: "button",
          mobileVisibility: "navigationMenu",
        },
        {
          key: "logout-info",
          label: "Logout Info (Desktop only)",
          icon: "lock",
          type: "button",
          mobileVisibility: "hidden",
        },
      ]}
    />
  </StoryLayout>
);
