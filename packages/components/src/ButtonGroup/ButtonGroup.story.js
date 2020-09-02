import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, ButtonGroup, Button, PrimaryButton, DangerButton, QuietButton, IconicButton } from "../index";

storiesOf("Components/ButtonGroup", module)
  .add("ButtonGroup", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonGroup>
        <PrimaryButton>Button</PrimaryButton>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>
    </Box>
  ))
  .add("with alignment right", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonGroup alignment="right">
        <PrimaryButton>Button</PrimaryButton>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>
    </Box>
  ))
  .add("with alignment spaced", () => (
    <Box bg="whiteGrey" p="x2" width="500px">
      <ButtonGroup alignment="spaced">
        <PrimaryButton>Button</PrimaryButton>
        <Button>Button</Button>
      </ButtonGroup>
    </Box>
  ))
  .add("more button types", () => (
    <Box bg="whiteGrey" p="x2" width="600px">
      <ButtonGroup>
        <PrimaryButton>Button</PrimaryButton>
        <DangerButton>Button</DangerButton>
        <Button>Button</Button>
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
          <ButtonGroup alignment="right">
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
