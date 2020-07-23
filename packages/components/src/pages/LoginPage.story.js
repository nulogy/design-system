import React from "react";
import { storiesOf } from "@storybook/react";
import theme from "../theme";
import { Alert, Box, Branding, Checkbox, Flex, Form, Input, Link, PrimaryButton, Text } from "../index";

storiesOf("Pages/LoginPage", module)
  .add("Base", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
      width="100%"
    >
      <Flex width="100%" maxWidth="384px" alignItems="center" justifyContent="center" flexGrow="1">
        <Flex
          height={{ extraSmall: "100%", small: "auto" }}
          maxWidth="384px"
          width="100%"
          borderRadius={{ extraSmall: null, small: "medium" }}
          boxShadow={{ extraSmall: null, small: "small" }}
          px={{ extraSmall: "x2", small: "x4" }}
          py={{ extraSmall: "x3", small: "x5" }}
          bg="white"
          my="x2"
          flexDirection="column"
          alignItems="center"
        >
          <Branding
            withLine
            size="large"
            subtext="Logo Subtext"
            alignment="center"
            style={{ marginBottom: theme.space.x2 }}
          />
          <Text color="darkGrey" fontSize="small" lineHeight="smallTextBase" mb="x4">
            Additional Text
          </Text>
          <Form style={{ width: "100%" }}>
            <Input labelText="Email" />
            <Input type="password" labelText="Password" />
            <PrimaryButton fullWidth>Sign In</PrimaryButton>
          </Form>
        </Flex>
      </Flex>
      <Box
        width={{
          extraSmall: `calc(100% - ${theme.space.x4})`,
          small: `calc(100% - ${theme.space.x8})`
        }}
        pt="x2"
        mb="x4"
        textAlign="center"
        style={{ borderTop: `solid 1px ${theme.colors.lightGrey}` }}
      >
        <Text color="darkGrey">© 2007-2019 Nulogy Corporation</Text>
      </Box>
    </Flex>
  ))
  .add("with remember me", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
      width="100%"
    >
      <Flex width="100%" maxWidth="384px" alignItems="center" justifyContent="center" flexGrow="1">
        <Flex
          height={{ extraSmall: "100%", small: "auto" }}
          maxWidth="384px"
          width="100%"
          borderRadius={{ extraSmall: null, small: "medium" }}
          boxShadow={{ extraSmall: null, small: "small" }}
          px={{ extraSmall: "x2", small: "x4" }}
          py={{ extraSmall: "x3", small: "x5" }}
          bg="white"
          my="x2"
          flexDirection="column"
          alignItems="center"
        >
          <Branding
            withLine
            size="large"
            subtext="Logo Subtext"
            alignment="center"
            style={{ marginBottom: theme.space.x2 }}
          />
          <Text color="darkGrey" fontSize="small" lineHeight="smallTextBase" mb="x4">
            Additional Text
          </Text>
          <form style={{ width: "100%" }}>
            <Input mb="x3" labelText="Email" />
            <Input type="password" labelText="Password" />
            <Checkbox mb="x3" labelText="Remember me" />
            <PrimaryButton fullWidth>Sign In</PrimaryButton>
          </form>
        </Flex>
      </Flex>
      <Box
        width={{
          extraSmall: `calc(100% - ${theme.space.x4})`,
          small: `calc(100% - ${theme.space.x8})`
        }}
        pt="x2"
        mb="x4"
        textAlign="center"
        style={{ borderTop: `solid 1px ${theme.colors.lightGrey}` }}
      >
        <Text color="darkGrey">© 2007-2019 Nulogy Corporation</Text>
      </Box>
    </Flex>
  ))
  .add("with forgot password link", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
      width="100%"
    >
      <Flex width="100%" maxWidth="384px" alignItems="center" justifyContent="center" flexGrow="1">
        <Flex
          height={{ extraSmall: "100%", small: "auto" }}
          maxWidth="384px"
          width="100%"
          borderRadius={{ extraSmall: null, small: "medium" }}
          boxShadow={{ extraSmall: null, small: "small" }}
          px={{ extraSmall: "x2", small: "x4" }}
          py={{ extraSmall: "x3", small: "x5" }}
          bg="white"
          my="x2"
          flexDirection="column"
          alignItems="center"
        >
          <Branding
            withLine
            size="large"
            subtext="Logo Subtext"
            alignment="center"
            style={{ marginBottom: theme.space.x2 }}
          />
          <Text color="darkGrey" fontSize="small" lineHeight="smallTextBase" mb="x4">
            Additional Text
          </Text>
          <Form style={{ width: "100%" }}>
            <Input labelText="Email" />
            <Input type="password" labelText="Password" />
            <PrimaryButton fullWidth>Sign In</PrimaryButton>
          </Form>
          <Box py="x1" mt="x1">
            <Link href="/">Forgot your password?</Link>
          </Box>
        </Flex>
      </Flex>
      <Box
        width={{
          extraSmall: `calc(100% - ${theme.space.x4})`,
          small: `calc(100% - ${theme.space.x8})`
        }}
        pt="x2"
        mb="x4"
        textAlign="center"
        style={{ borderTop: `solid 1px ${theme.colors.lightGrey}` }}
      >
        <Text color="darkGrey">© 2007-2019 Nulogy Corporation</Text>
      </Box>
    </Flex>
  ))
  .add("with error", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
      width="100%"
    >
      <Flex width="100%" maxWidth="384px" alignItems="center" justifyContent="center" flexGrow="1">
        <Flex
          height={{ extraSmall: "100%", small: "auto" }}
          maxWidth="384px"
          width="100%"
          borderRadius={{ extraSmall: null, small: "medium" }}
          boxShadow={{ extraSmall: null, small: "small" }}
          px={{ extraSmall: "x2", small: "x4" }}
          py={{ extraSmall: "x3", small: "x5" }}
          bg="white"
          my="x2"
          flexDirection="column"
          alignItems="center"
        >
          <Branding
            withLine
            size="large"
            subtext="Logo Subtext"
            alignment="center"
            style={{ marginBottom: theme.space.x2 }}
          />
          <Text fontSize="small" lineHeight="smallTextBase" mb="x4">
            Additional Text
          </Text>
          <Alert mb="x4" style={{ width: "100%" }} type="danger">
            text
          </Alert>
          <Form style={{ width: "100%" }}>
            <Input labelText="Email" />
            <Input type="password" labelText="Password" />
            <PrimaryButton fullWidth>Sign In</PrimaryButton>
          </Form>
        </Flex>
      </Flex>
      <Box
        width={{
          extraSmall: `calc(100% - ${theme.space.x4})`,
          small: `calc(100% - ${theme.space.x8})`
        }}
        pt="x2"
        mb="x4"
        textAlign="center"
        style={{ borderTop: `solid 1px ${theme.colors.lightGrey}` }}
      >
        <Text color="darkGrey">© 2007-2019 Nulogy Corporation</Text>
      </Box>
    </Flex>
  ))
  .add("with error and no additional text", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
      width="100%"
    >
      <Flex width="100%" maxWidth="384px" alignItems="center" justifyContent="center" flexGrow="1">
        <Flex
          height={{ extraSmall: "100%", small: "auto" }}
          maxWidth="384px"
          width="100%"
          borderRadius={{ extraSmall: null, small: "medium" }}
          boxShadow={{ extraSmall: null, small: "small" }}
          px={{ extraSmall: "x2", small: "x4" }}
          py={{ extraSmall: "x3", small: "x5" }}
          bg="white"
          my="x2"
          flexDirection="column"
          alignItems="center"
        >
          <Branding
            withLine
            size="large"
            subtext="Logo Subtext"
            alignment="center"
            style={{ marginBottom: theme.space.x4 }}
          />
          <Alert mb="x4" style={{ width: "100%" }} type="danger">
            text
          </Alert>
          <Form style={{ width: "100%" }}>
            <Input labelText="Email" />
            <Input type="password" labelText="Password" />
            <PrimaryButton fullWidth>Sign In</PrimaryButton>
          </Form>
        </Flex>
      </Flex>
      <Box
        width={{
          extraSmall: `calc(100% - ${theme.space.x4})`,
          small: `calc(100% - ${theme.space.x8})`
        }}
        pt="x2"
        mb="x4"
        textAlign="center"
        style={{ borderTop: `solid 1px ${theme.colors.lightGrey}` }}
      >
        <Text color="darkGrey">© 2007-2019 Nulogy Corporation</Text>
      </Box>
    </Flex>
  ));
