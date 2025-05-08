import React from "react";
import Navigation from "../Navigation";
import { ApplicationFrame, Page } from "../../Layout";
import Sidebar from "../../Layout/Sidebar";
import { Box } from "../../Box";
import { Flex } from "../../Flex";
import { Text } from "../../Type";

export default {
  title: "Components/Navigation/Primary Navigation",
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
            </Flex>
          </Sidebar>
          <Box flex={1} />
        </Flex>
      </Page>
    </ApplicationFrame>
  );
};
