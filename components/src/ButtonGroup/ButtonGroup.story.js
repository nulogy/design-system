import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, ButtonGroup, Button, PrimaryButton, DangerButton, QuietButton, IconicButton } from "../index";

storiesOf("ButtonGroup", module)
  .add("ButtonGroup", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonGroup>
        <Button>Button</Button>
        <Button>Button</Button>
        <PrimaryButton>Button</PrimaryButton>
      </ButtonGroup>
    </Box>
  ))
  .add("with alignment left", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonGroup alignment="left">
        <PrimaryButton>Button</PrimaryButton>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>
    </Box>
  ))
  .add("with alignment spaced", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonGroup alignment="spaced">
        <Button>Button</Button>
        <PrimaryButton>Button</PrimaryButton>
      </ButtonGroup>
    </Box>
  ))
  .add("more button types", () => (
    <Box bg="whiteGrey" p="x2" width="600px">
      <ButtonGroup>
        <Button>Button</Button>
        <PrimaryButton>Button</PrimaryButton>
        <DangerButton>Button</DangerButton>
        <QuietButton>Button</QuietButton>
        <IconicButton icon="menu" />
        <IconicButton icon="menu">Button</IconicButton>
      </ButtonGroup>
    </Box>
  ))
  .add(
    "wrapping buttons",
    () => (
      <>
        <Box bg="whiteGrey" p="x2">
          <ButtonGroup>
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
          </ButtonGroup>
        </Box>
        <Box bg="whiteGrey" p="x2" mt="x2">
          <ButtonGroup alignment="left">
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
          </ButtonGroup>
        </Box>
      </>
    ),
    { viewport: { defaultViewport: "extraSmall" } }
  );
