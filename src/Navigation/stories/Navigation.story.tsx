import React from "react";
import { Navigation } from "..";
import { ApplicationFrame, Page } from "../../Layout";
import { Placeholder } from "../../utils/story/placeholder";
import { Select } from "../../Select";
import { Flex } from "../../Flex";
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
        secondaryLogo={<Logo style={{ width: "auto", height: 32 }} />}
        userMenu={{
          triggerText: { title: "haidera@nulogy.com", subtitle1: "Nulogy", subtitle2: "Toronto, ON" },
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
