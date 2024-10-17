import React from "react";
import { Flex } from "../Flex";
import { Button, PrimaryButton, DangerButton, QuietButton } from ".";

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
  <Flex flexDirection="column" gap="x1">
    <Flex alignItems="center" gap="x1">
      <Button size="small">Create project</Button>
      <Button size="medium">Create project</Button>
      <Button size="large">Create project</Button>
    </Flex>

    <Flex alignItems="center" gap="x1">
      <PrimaryButton size="small">Create project</PrimaryButton>
      <PrimaryButton size="medium">Create project</PrimaryButton>
      <PrimaryButton size="large">Create project</PrimaryButton>
    </Flex>

    <Flex alignItems="center" gap="x1">
      <QuietButton size="small">Create project</QuietButton>
      <QuietButton size="medium">Create project</QuietButton>
      <QuietButton size="large">Create project</QuietButton>
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
