import React, { useState } from "react";
import useConditionalAutoClick from "../../utils/testing/useConditionalAutoClick";
import Navigation from "../Navigation";
import { ApplicationFrame, Page } from "../../Layout";
import Sidebar from "../../Layout/Sidebar";
import { Box } from "../../Box";
import { Checkbox } from "../../Checkbox";
import { Text } from "../../Type";
import { StatusIndicator } from "../../StatusIndicator";
import { Flex, InlineFlex } from "../../Flex";
import { Icon } from "../../Icon";
import { Code } from "../../utils/story/code";

export default {
  title: "Components/Navigation/App Switcher",
  parameters: {
    layout: "fullscreen",
  },
};

const appSwitcherToggleSelector = 'button[aria-label="Toggle app switcher"]';

export const AllApps = () => {
  useConditionalAutoClick({
    selector: appSwitcherToggleSelector,
    condition: {
      queryParam: "cypressTest",
      when: "absent",
    },
  });

  return (
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
    />
  );
};

export const OnlySelectApps = () => {
  useConditionalAutoClick({
    selector: appSwitcherToggleSelector,
    condition: {
      queryParam: "cypressTest",
      when: "absent",
    },
  });
  return (
    <Navigation
      appSwitcher={{
        apps: {
          "production-scheduling": {
            url: "https://nulogy.com/",
          },
          "digital-quality-inspection": {
            url: "https://nulogy.com/",
          },
          "shop-floor": {
            url: "https://nulogy.com/",
          },
        },
      }}
    />
  );
};

export const WithConditionallyVisibleApps = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useConditionalAutoClick({
    selector: appSwitcherToggleSelector,
    condition: {
      queryParam: "cypressTest",
      when: "absent",
    },
  });

  return (
    <ApplicationFrame
      navBar={
        <Navigation
          appSwitcher={{
            apps: {
              "production-scheduling": {
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
                visible: isAdmin,
              },
            },
          }}
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
              <Checkbox labelText="User is admin" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
              <Text fontSize="small" color="darkGrey">
                In this example, the Smart Factory app is only visible to <strong>admins</strong>. The app switcher is
                conditionally rendered based on the user&apos;s role.
              </Text>
            </Flex>
          </Sidebar>
          <Box flex={1} />
        </Flex>
      </Page>
    </ApplicationFrame>
  );
};

export const WithAnIndicator = () => {
  useConditionalAutoClick({
    selector: appSwitcherToggleSelector,
    condition: {
      queryParam: "cypressTest",
      when: "absent",
    },
  });

  return (
    <ApplicationFrame
      navBar={
        <Navigation
          appSwitcher={{
            apps: {
              "production-scheduling": {
                url: "https://nulogy.com/",
              },
              "smart-factory": {
                url: "https://nulogy.com/",
                indicator: <StatusIndicator type="informative">new</StatusIndicator>,
              },
              "shop-floor": {
                url: "https://nulogy.com/",
                indicator: (
                  <InlineFlex alignItems="center" gap="x0_25" bg="lightRed" pl="x0_5" pr="x1" borderRadius="rounded">
                    <Icon icon="error" size="x2" color="red" />
                    <Text
                      fontSize="smaller"
                      letterSpacing="0.05em"
                      textTransform="uppercase"
                      fontWeight="medium"
                      color="red"
                    >
                      Not available
                    </Text>
                  </InlineFlex>
                ),
              },
            },
          }}
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
                In this example, the Smart Factory app is using a <Code>StatusIndicator</Code>, The Shop Floor app is
                using a custom one.
              </Text>
            </Flex>
          </Sidebar>
          <Box flex={1} />
        </Flex>
      </Page>
    </ApplicationFrame>
  );
};
