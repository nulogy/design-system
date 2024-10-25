import React from "react";
import { Flex } from "../Flex";
import { Button, PrimaryButton, DangerButton, QuietButton } from ".";
import { Heading2, Heading4 } from "../Type";

export default {
  title: "Components/Buttons",
};

export const _Button = () => <Button>Create project</Button>;
export const _PrimaryButton = () => <PrimaryButton>Create project</PrimaryButton>;

_PrimaryButton.story = {
  name: "PrimaryButton",
};

export const _DangerButton = () => <DangerButton>Delete project</DangerButton>;

_DangerButton.story = {
  name: "DangerButton",
};

export const _QuietButton = () => <QuietButton>Create project</QuietButton>;

_QuietButton.story = {
  name: "QuietButton",
};

export const WithDifferentSizes = () => (
  <Flex flexDirection="column" gap="x2">
    <Flex flexDirection="column">
      <Heading4>Medium size (default)</Heading4>
      <Flex gap="x1">
        <Button>Secondary Button</Button>
        <PrimaryButton>Primary Button</PrimaryButton>
        <DangerButton>Danger Button</DangerButton>
        <QuietButton>Quiet Button</QuietButton>
      </Flex>
    </Flex>
    <Flex flexDirection="column">
      <Heading4>Small size</Heading4>
      <Flex gap="x1">
        <Button size="small">Secondary Button</Button>
        <PrimaryButton size="small">Primary Button</PrimaryButton>
        <DangerButton size="small">Danger Button</DangerButton>
        <QuietButton size="small">Quiet Button</QuietButton>
      </Flex>
    </Flex>
  </Flex>
);

export const WithASelectedIcon = () => (
  <>
    <Button icon="add" iconSide="left" size="small" onClick={() => {}} disabled>
      Create project
    </Button>
    <Button icon="add" iconSide="right">
      Create project
    </Button>
  </>
);

WithASelectedIcon.story = {
  name: "With a selected Icon",
};

export const SetToFullWidth = () => <PrimaryButton fullWidth>Create project</PrimaryButton>;

SetToFullWidth.story = {
  name: "Set to full width",
};

export const SetToDisabled = () => <PrimaryButton disabled>Create project</PrimaryButton>;

SetToDisabled.story = {
  name: "Set to disabled",
};

export const AsALink = () => (
  <PrimaryButton asLink href="/">
    Create project
  </PrimaryButton>
);

AsALink.story = {
  name: "As a link",
};
