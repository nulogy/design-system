import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, ButtonSet, Button, PrimaryButton, DangerButton, QuietButton, IconicButton } from "../index";

storiesOf("ButtonSet", module)
  .add("ButtonSet", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonSet>
        <Button>Button</Button>
        <Button>Button</Button>
        <PrimaryButton>Button</PrimaryButton>
      </ButtonSet>
    </Box>
  ))
  .add("with alignment left", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonSet alignment="left">
        <PrimaryButton>Button</PrimaryButton>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonSet>
    </Box>
  ))
  .add("with alignment center", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonSet alignment="center">
        <Button>Button</Button>
        <PrimaryButton>Button</PrimaryButton>
      </ButtonSet>
    </Box>
  ))
  .add("more button types", () => (
    <Box bg="whiteGrey" p="x2" width="600px">
      <ButtonSet>
        <Button>Button</Button>
        <PrimaryButton>Button</PrimaryButton>
        <DangerButton>Button</DangerButton>
        <QuietButton>Button</QuietButton>
        <IconicButton icon="menu" />
        <IconicButton icon="menu">Button</IconicButton>
      </ButtonSet>
    </Box>
  ))
  .add("wrapping buttons", () => (
    <>
      <Box bg="whiteGrey" p="x2">
        <ButtonSet>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonSet>
      </Box>
      <Box bg="whiteGrey" p="x2" mt="x2">
        <ButtonSet alignment="left">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </ButtonSet>
      </Box>
    </>
  ));
