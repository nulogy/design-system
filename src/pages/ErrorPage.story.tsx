import React from "react";
import { useTheme } from "styled-components";
import { Alert, Box, Branding, Flex, Link } from "../index";
import { Text } from "../Type";

const ErrorPageWidth = "672px";
const ErrorPageAlertWidth = "432px";

export default {
  title: "Pages/ErrorPage",
};

export const Static = () => (
  <Text>
    For non-React, static HTML error pages see the Nulogy error pages repository{" "}
    <Link href="https://github.com/nulogy/error-pages">on GitHub</Link> or preview them{" "}
    <Link href="https://nulogy.github.io/error-pages/">here</Link>.
  </Text>
);

Static.parameters = {
  chromatic: { disable: true },
};

export const Base = () => (
  <Flex height="100vh" flexDirection="column" pt="x3" pr="x2" pb="x2" pl="x2">
    <Flex flexGrow={1} maxWidth={ErrorPageWidth} m="0 auto">
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
  </Flex>
);

/* eslint-disable jsx-a11y/anchor-is-valid */
export const WithALink = () => {
  const theme = useTheme();
  return (
    <Flex height="100vh" flexDirection="column" pt="x3" pr="x2" pb="x2" pl="x2">
      <Flex flexGrow={1} maxWidth={ErrorPageWidth} m="0 auto">
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
    </Flex>
  );
};
/* eslint-enable jsx-a11y/anchor-is-valid */

WithALink.story = {
  name: "With a link",
};

export const Maintenance = () => (
  <Flex height="100vh" flexDirection="column" pt="x3" pr="x2" pb="x2" pl="x2">
    <Flex flexGrow={1} maxWidth={ErrorPageWidth} m="0 auto">
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
  </Flex>
);
