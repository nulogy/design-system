/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { storiesOf } from "@storybook/react";
import theme from "../theme";
import { Box, Flex, Heading1, Heading2, Text, NavBar, IconicButton, Link, Icon } from "../index";

const primaryMenu = [
  {
    name: "Dashboard",
    items: [{ name: "Customers", href: "/" }, { name: "Invoices", href: "/" }]
  },
  { name: "Link", href: "/" }
];

const secondaryMenu = [
  {
    name: "Settings",
    items: [{ name: "Permissions", href: "/" }, { name: "Manage account", href: "/" }]
  }
];

const StorybookContentHeight = "calc(100vh - 72px - 48px - 16px)";
const StorybookSidebarWidth = "calc(100vw - 48px - 16px)";
const StorybookMainWidth = "calc(100vw - 96px - 16px)";

storiesOf("Pages/Custom", module)
  .add("Default", () => (
    <>
      <Flex bg="whiteGrey" flexDirection="column">
        <NavBar menuData={{ primaryMenu, secondaryMenu }} />
        <Flex m="x1" bg="white" boxShadow="large" borderRadius="medium" minHeight={StorybookContentHeight}>
          <Box p="x3" flexGrow="2">
            <Heading1 mb="x6">I am title</Heading1>
            <Text>I am main content.</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  ))
  .add("With sidebar", () => (
    <>
      <Flex bg="whiteGrey" flexDirection="column">
        <NavBar menuData={{ primaryMenu, secondaryMenu }} />
        <Flex m="x1" bg="white" boxShadow="large" borderRadius="medium" minHeight={StorybookContentHeight}>
          <Box p="x3" flexGrow="2">
            <Heading1 mb="x6">I am title</Heading1>
            <Text>I am main content.</Text>
          </Box>
          <Box
            bg="white"
            pt="x3"
            pr="x2"
            pb="x3"
            pl="x3"
            width={{ extraSmall: StorybookSidebarWidth, medium: "400px", large: "472px" }}
            borderLeft={{ medium: `solid 1px ${theme.colors.lightGrey}` }}
            position={{ extraSmall: "absolute", medium: "static" }}
            borderRadius="medium"
          >
            <Flex justifyContent="space-between" alignItems="flex-start" mb="x4">
              <Heading2 mt="half">I am sidebar</Heading2>
              <IconicButton icon="close" />
            </Flex>
            <Text>I am sidbar content.</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  ))
  .add("With breadcrumbs and actions", () => (
    <>
      <Flex bg="whiteGrey" flexDirection="column">
        <NavBar menuData={{ primaryMenu, secondaryMenu }} />
        <Flex m="x1" bg="white" boxShadow="large" borderRadius="medium" minHeight={StorybookContentHeight}>
          <Box pt="x1" pr="x3" pb="x3" pl="x3" flexGrow="2">
            <Flex justifyContent="space-between" alignItems="flex-start" height="32px">
              <Flex alignItems="center" pt="x1" width={{ extraSmall: StorybookMainWidth, medium: "auto" }}>
                <Link fontSize="smaller" color="darkBlue" mr="half" underline={false}>
                  Breadcrumb
                </Link>
                <Icon icon="rightArrow" size="20px" color="darkGrey" mr="half" />
                <Link fontSize="smaller" color="darkBlue" mr="half" underline={false}>
                  Breadcrumb
                </Link>
                <Icon icon="rightArrow" size="20px" color="darkGrey" mr="half" />
              </Flex>
              <IconicButton icon="more" mt="x2" />
            </Flex>
            <Heading1 mb="x6">I am title</Heading1>
            <Text>I am main content.</Text>
          </Box>
          <Box
            bg="white"
            pt="x3"
            pr="x2"
            pb="x3"
            pl="x3"
            width={{ extraSmall: StorybookSidebarWidth, medium: "400px", large: "472px" }}
            borderLeft={{ medium: `solid 1px ${theme.colors.lightGrey}` }}
            position={{ extraSmall: "absolute", medium: "static" }}
            borderRadius="medium"
          >
            <Flex justifyContent="space-between" alignItems="flex-start" mb="x4">
              <Heading2 mt="half">I am sidebar</Heading2>
              <IconicButton icon="close" />
            </Flex>
            <Text>I am sidebar content.</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  ));
