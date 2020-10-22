import React from "react";
import { Box, ButtonGroup, Button, PrimaryButton, DangerButton, QuietButton, IconicButton } from "../index";

export default {
  title: "Components/ButtonGroup"
};

export const _ButtonGroup = () => (
  <Box bg="whiteGrey" p="x2" width="500px">
    <ButtonGroup>
      <PrimaryButton>Button</PrimaryButton>
      <Button>Button</Button>
      <Button>Button</Button>
    </ButtonGroup>
  </Box>
);

_ButtonGroup.story = {
  name: "ButtonGroup"
};

export const WithAlignmentRight = () => (
  <Box bg="whiteGrey" p="x2" width="500px">
    <ButtonGroup alignment="right">
      <PrimaryButton>Button</PrimaryButton>
      <Button>Button</Button>
      <Button>Button</Button>
    </ButtonGroup>
  </Box>
);

WithAlignmentRight.story = {
  name: "with alignment right"
};

export const WithAlignmentSpaced = () => (
  <Box bg="whiteGrey" p="x2" width="500px">
    <ButtonGroup alignment="spaced">
      <PrimaryButton>Button</PrimaryButton>
      <Button>Button</Button>
    </ButtonGroup>
  </Box>
);

WithAlignmentSpaced.story = {
  name: "with alignment spaced"
};

export const MoreButtonTypes = () => (
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
);

MoreButtonTypes.story = {
  name: "more button types"
};

export const WrappingButtons = () => (
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
);

WrappingButtons.story = {
  name: "wrapping buttons",
  parameters: { viewport: { defaultViewport: "extraSmall" } }
};
