import React from "react";
import theme from "../theme";
import {
  Alert,
  Box,
  Branding,
  Checkbox,
  Flex,
  Form,
  Input,
  Link,
  PrimaryButton,
  Text,
} from "../index";

export default {
  title: "Pages/LoginPage",
};

export const Base = () => (
  <Flex
    minHeight="100vh"
    justifyContent="center"
    flexDirection="column"
    alignItems="center"
    bg={{ extraSmall: "white", small: "whiteGrey" }}
    width="100%"
  >
    <Flex
      width="100%"
      maxWidth="384px"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
    >
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
        <Text
          color="darkGrey"
          fontSize="small"
          lineHeight="smallTextBase"
          mb="x4"
        >
          Additional Text
        </Text>
        <Form style={{ width: "100%" }}>
          <Input labelText="Email" />
          <Input type="password" labelText="Password" />
          <PrimaryButton fullWidth>Sign In</PrimaryButton>
        </Form>
      </Flex>
    </Flex>
  </Flex>
);

export const WithRememberMe = () => (
  <Flex
    minHeight="100vh"
    justifyContent="center"
    flexDirection="column"
    alignItems="center"
    bg={{ extraSmall: "white", small: "whiteGrey" }}
    width="100%"
  >
    <Flex
      width="100%"
      maxWidth="384px"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
    >
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
        <Text
          color="darkGrey"
          fontSize="small"
          lineHeight="smallTextBase"
          mb="x4"
        >
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
  </Flex>
);

WithRememberMe.story = {
  name: "with remember me",
};

export const WithForgotPasswordLink = () => (
  <Flex
    minHeight="100vh"
    justifyContent="center"
    flexDirection="column"
    alignItems="center"
    bg={{ extraSmall: "white", small: "whiteGrey" }}
    width="100%"
  >
    <Flex
      width="100%"
      maxWidth="384px"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
    >
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
        <Text
          color="darkGrey"
          fontSize="small"
          lineHeight="smallTextBase"
          mb="x4"
        >
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
  </Flex>
);

WithForgotPasswordLink.story = {
  name: "with forgot password link",
};

export const WithError = () => (
  <Flex
    minHeight="100vh"
    justifyContent="center"
    flexDirection="column"
    alignItems="center"
    bg={{ extraSmall: "white", small: "whiteGrey" }}
    width="100%"
  >
    <Flex
      width="100%"
      maxWidth="384px"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
    >
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
  </Flex>
);

WithError.story = {
  name: "with error",
};

export const WithErrorAndNoAdditionalText = () => (
  <Flex
    minHeight="100vh"
    justifyContent="center"
    flexDirection="column"
    alignItems="center"
    bg={{ extraSmall: "white", small: "whiteGrey" }}
    width="100%"
  >
    <Flex
      width="100%"
      maxWidth="384px"
      alignItems="center"
      justifyContent="center"
      flexGrow="1"
    >
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
  </Flex>
);

WithErrorAndNoAdditionalText.story = {
  name: "with error and no additional text",
};