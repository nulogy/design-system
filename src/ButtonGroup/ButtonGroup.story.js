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
  <ButtonGroup alignment="right" p="x2" bg="whiteGrey" width="500px">
    <PrimaryButton>Button</PrimaryButton>
    <Button>Button</Button>
    <Button>Button</Button>
  </ButtonGroup>
);

WithAlignmentRight.story = {
  name: "with alignment right"
};

export const WithAlignmentSpaced = () => (
  <ButtonGroup alignment="spaced" bg="whiteGrey" p="x2" width="500px">
    <PrimaryButton>Button</PrimaryButton>
    <Button>Button</Button>
  </ButtonGroup>
);

WithAlignmentSpaced.story = {
  name: "with alignment spaced"
};

export const MoreButtonTypes = () => (

  <ButtonGroup bg="whiteGrey" p="x2" width="600px">
    <PrimaryButton>Button</PrimaryButton>
    <DangerButton>Button</DangerButton>
    <Button>Button</Button>
    <QuietButton>Button</QuietButton>
    <IconicButton icon="menu" />
    <IconicButton icon="menu">Button</IconicButton>
  </ButtonGroup>
);

MoreButtonTypes.story = {
  name: "more button types"
};

export const WrappingButtons = () => (
  <>
    <ButtonGroup bg="whiteGrey" p="x2">
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
    <ButtonGroup alignment="right" bg="whiteGrey" p="x2" mt="x2">
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
  </>
);

WrappingButtons.story = {
  name: "wrapping buttons",
  parameters: { viewport: { defaultViewport: "extraSmall" } }
};
