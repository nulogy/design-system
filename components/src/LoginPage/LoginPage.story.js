import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Branding } from "../Branding";
import { Form } from "../Form";
import { Input } from "../Input";
import { Text } from "../Type";
import { PrimaryButton } from "../Button";
import { Link } from "../Link";
import { Checkbox } from "../Checkbox";
import theme from "../theme";

storiesOf("LoginPages", module)
  .add("PackManager", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
    >
      <Box flexGrow="1">
        <Flex
          height={{ extraSmall: "100%", small: "auto" }}
          width="384px"
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
            size="large"
            subtext={"Operational Solution"}
            alignment="middle"
            style={{ marginBottom: theme.space.x2 }}
          />
          <Text fontSize="small" lineHeight="smallTextBase" mb="x4">
            Formerly known as <span style={{ color: theme.colors.yellow }}>PackManager</span>
          </Text>
          <Form style={{ width: "100%" }}>
            <Input labelText="Email" />
            <Input type="password" labelText="Password" />
            <PrimaryButton fullWidth>Sign In</PrimaryButton>
          </Form>
        </Flex>
      </Box>
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
  .add("GO", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
    >
      <Flex
        height={{ extraSmall: "100%", small: "auto" }}
        width="384px"
        borderRadius={{ extraSmall: null, small: "medium" }}
        boxShadow={{ extraSmall: null, small: "small" }}
        px={{ extraSmall: "x2", small: "x4" }}
        py={{ extraSmall: "x3", small: "x5" }}
        bg="white"
        flexDirection="column"
        alignItems="center"
        style={{ margin: "auto" }}
      >
        <Branding
          size="large"
          subtext={"Ecosystem Solution"}
          alignment="middle"
          style={{ marginBottom: theme.space.x2 }}
        />
        <Text fontSize="small" lineHeight="smallTextBase" mb="x4">
          Formerly known as <span style={{ color: theme.colors.green }}>GO</span>
        </Text>
        <form style={{ width: "100%" }}>
          <Input mb="x3" labelText="Email" />
          <Input type="password" labelText="Password" />
          <Checkbox mb="x3" labelText="Remember me" />
          <PrimaryButton fullWidth>Sign In</PrimaryButton>
        </form>
      </Flex>
    </Flex>
  ))
  .add("QCloud", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
    >
      <Box flexGrow="1">
        <Flex
          height={{ extraSmall: "100%", small: "auto" }}
          width="384px"
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
            size="large"
            subtext={"Operational Solution"}
            alignment="middle"
            style={{ marginBottom: theme.space.x2 }}
          />
          <Text fontSize="small" lineHeight="smallTextBase" mb="x4">
            Formerly known as <span style={{ color: theme.colors.blue }}>QCLOUD</span>
          </Text>
          <Form style={{ width: "100%" }}>
            <Input labelText="Email" />
            <Input type="password" labelText="Password" />
            <PrimaryButton fullWidth>Sign In</PrimaryButton>
          </Form>
          <Box py="x1" mt="x1">
            <Link>Forgot your password?</Link>
          </Box>
        </Flex>
      </Box>
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
  .add("CPI", () => (
    <Flex
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      bg={{ extraSmall: "white", small: "whiteGrey" }}
    >
      <Flex
        height={{ extraSmall: "100%", small: "auto" }}
        width="384px"
        borderRadius={{ extraSmall: null, small: "medium" }}
        boxShadow={{ extraSmall: null, small: "small" }}
        px={{ extraSmall: "x2", small: "x4" }}
        py={{ extraSmall: "x3", small: "x5" }}
        bg="white"
        flexDirection="column"
        alignItems="center"
        style={{ margin: "auto" }}
      >
        <Branding size="large" subtext={"Connections"} alignment="middle" style={{ marginBottom: theme.space.x2 }} />
        <Text fontSize="small" lineHeight="smallTextBase" mb="x4">
          Formerly known as <span style={{ fontWeight: theme.fontWeights.medium }}>Common Platform Interface</span>
        </Text>
        <Form>
          <Input labelText="Email" />
          <Input type="password" labelText="Password" />
          <PrimaryButton fullWidth>Sign In</PrimaryButton>
        </Form>
      </Flex>
    </Flex>
  ));
