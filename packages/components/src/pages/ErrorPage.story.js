/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { storiesOf } from "@storybook/react";
import theme from "../theme";
import { Alert, Box, Branding, Flex, Link, Text } from "../index";

const ErrorPageWidth = "672px";
const ErrorPageAlertWidth = "432px";

storiesOf("Pages/ErrorPage", module)
  .add("Base", () => (
    <Flex height="100vh" flexDirection="column" pt="x3" pr="x2" pb="x2" pl="x2">
      <Flex flexGrow="1" maxWidth={ErrorPageWidth} m="0 auto">
        <Flex width="100%" flexDirection={{ extraSmall: "column", large: "row" }} alignItems="center">
          <Box
            mb={{ extraSmall: "x5", small: "x4", large: 0 }}
            mt={{ extraSmall: "x2", small: "80px", large: 0 }}
            mr={{ extraSmall: 0, large: "x3" }}
          >
            <Branding size="large" />
          </Box>
          <Box maxWidth={ErrorPageAlertWidth}>
            <Alert type="danger" title="We're sorry, but something went wrong.">
              We&apos;ve been notified about this issue and we&apos;ll take a look at it shortly.
            </Alert>
          </Box>
        </Flex>
      </Flex>
      <Box pt="x2" textAlign="center" style={{ borderTop: `solid 1px ${theme.colors.lightGrey}` }}>
        <Text color="darkGrey" fontSize="small">
          © 2007-2019 Nulogy Corporation
        </Text>
      </Box>
    </Flex>
  ))
  .add("With a link", () => (
    <Flex height="100vh" flexDirection="column" pt="x3" pr="x2" pb="x2" pl="x2">
      <Flex flexGrow="1" maxWidth={ErrorPageWidth} m="0 auto">
        <Flex width="100%" flexDirection={{ extraSmall: "column", large: "row" }} alignItems="center">
          <Box
            mb={{ extraSmall: "x5", small: "x4", large: 0 }}
            mt={{ extraSmall: "x2", small: "80px", large: `-${theme.space.x4}` }}
            mr={{ extraSmall: 0, large: "x3" }}
          >
            <Branding size="large" />
          </Box>
          <Box maxWidth={ErrorPageAlertWidth}>
            <Alert type="danger" title="We're sorry, but something went wrong." mb="x2">
              We&apos;ve been notified about this issue and we&apos;ll take a look at it shortly.
            </Alert>
            <Link href="#">Back to homepage</Link>
          </Box>
        </Flex>
      </Flex>
      <Box pt="x2" textAlign="center" style={{ borderTop: `solid 1px ${theme.colors.lightGrey}` }}>
        <Text color="darkGrey" fontSize="small">
          © 2007-2019 Nulogy Corporation
        </Text>
      </Box>
    </Flex>
  ))
  .add("Maintenance", () => (
    <Flex height="100vh" flexDirection="column" pt="x3" pr="x2" pb="x2" pl="x2">
      <Flex flexGrow="1" maxWidth={ErrorPageWidth} m="0 auto">
        <Flex width="100%" flexDirection={{ extraSmall: "column", large: "row" }} alignItems="center">
          <Box
            mb={{ extraSmall: "x5", small: "x4", large: 0 }}
            mt={{ extraSmall: "x2", small: "80px", large: 0 }}
            mr={{ extraSmall: 0, large: "x3" }}
          >
            <Branding size="large" />
          </Box>
          <Box maxWidth={ErrorPageAlertWidth}>
            <Alert>We are currently adding new features to Nulogy Quality Control. We should be online shortly.</Alert>
          </Box>
        </Flex>
      </Flex>
      <Box pt="x2" textAlign="center" style={{ borderTop: `solid 1px ${theme.colors.lightGrey}` }}>
        <Text color="darkGrey" fontSize="small">
          © 2007-2019 Nulogy Corporation
        </Text>
      </Box>
    </Flex>
  ));
