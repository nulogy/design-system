import React, { useState } from "react";
import { Input } from "../../Input";
import { Navigation } from "..";
import { ApplicationFrame, Page, Sidebar } from "../../Layout";
import { Placeholder } from "../../utils/story/placeholder";
import { Select } from "../../Select";
import { Flex } from "../../Flex";
import { Text } from "../../Type";
import { Code } from "../../utils/story/code";
import Logo from "./fixtures/logos/CustomLogo3";

export default {
  title: "Components/Navigation",
  parameters: {
    layout: "fullscreen",
  },
};

export const BasicUsage = () => (
  <ApplicationFrame
    navBar={
      <Navigation
        appSwitcher={{
          apps: {
            "production-scheduling": {
              url: "https://nulogy.com/",
            },
            "supplier-collaboration": {
              url: "https://nulogy.com/",
            },
            "digital-quality-inspection": {
              url: "https://nulogy.com/",
            },
            "shop-floor": {
              url: "https://nulogy.com/",
            },
            "smart-factory": {
              url: "https://nulogy.com/",
            },
            connections: {
              url: "https://nulogy.com/",
            },
            data: {
              url: "https://nulogy.com/",
            },
          },
        }}
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
            items: [
              {
                key: "quality-inspection-form",
                label: "Quality Inspection Form",
                type: "button",
                props: {
                  onClick: () => {
                    alert("You clicked Quality Inspection Form");
                  },
                },
              },
              {
                key: "production-report-form",
                label: "Production Report Form",
                type: "button",
                props: {
                  onClick: () => {
                    alert("You clicked Production Report Form");
                  },
                },
              },
              {
                key: "maintenance-request-form",
                label: "Maintenance Request Form",
                type: "button",
                props: {
                  onClick: () => {
                    alert("You clicked Maintenance Request Form");
                  },
                },
              },
              {
                key: "inventory-count-form",
                label: "Inventory Count Form",
                type: "link",
              },
            ],
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
        secondaryLogo={<Logo style={{ width: "auto", height: 32 }} />}
        userMenu={{
          triggerText: { title: "haidera@nulogy.com", subtitle2: "Toronto, ON" },
          header: {
            title: "Haider Alshamma",
            subtitle1: "haidera@nulogy.com",
            subtitle2: "Nulogy",
          },
          controls: () => (
            <Flex gap="x2" flexDirection="column" width="100%" pt="x1">
              <Select
                labelText="Company"
                defaultValue={["Nulogy Canada"]}
                options={[
                  { value: "Nulogy Canada", label: "Nulogy - Canada" },
                  { value: "Nulogy US", label: "Nulogy - US" },
                  { value: "Nulogy UK", label: "Nulogy - UK" },
                ]}
              />
              <Select
                labelText="User group"
                defaultValue={["super-user"]}
                options={[
                  { value: "super-user", label: "Super User" },
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                ]}
              />
            </Flex>
          ),
          menuItems: [
            {
              key: "preferences",
              label: "Preferences",
              type: "button",
              props: {
                onClick: () => {
                  console.log("You clicked preferences");
                },
              },
            },
            {
              key: "sign-out",
              label: "Sign out",
              type: "button",
              props: {
                onClick: () => {
                  console.log("You clicked sign out");
                },
              },
            },
          ],
        }}
      />
    }
  >
    <Page fullHeight>
      <Placeholder />
    </Page>
  </ApplicationFrame>
);

export const WithACustomBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("1000px");

  return (
    <ApplicationFrame
      navBar={
        <Navigation
          primaryNavigation={[{ key: "dashboard", label: "Dashboard", type: "link" }]}
          secondaryNavigation={[{ key: "settings", icon: "settings", tooltip: "Settings", type: "button" }]}
          breakpoint={breakpoint}
        />
      }
    >
      <Page fullHeight>
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
            <Input labelText="Breakpoint" value={breakpoint} onChange={(e) => setBreakpoint(e.target.value)} />
            <Text fontSize="small" color="darkGrey">
              The navigation will transition to desktop when the viewport is wider than <Code>{breakpoint}</Code>.
            </Text>
            <Text fontSize="small" color="darkGrey">
              You can also use any valid key from the <a href="/?path=/story/tokens--breakpoints">theme breakpoints</a>{" "}
              as a breakpoint value.
            </Text>
          </Flex>
        </Sidebar>
      </Page>
    </ApplicationFrame>
  );
};
