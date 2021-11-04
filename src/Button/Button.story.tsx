import React from "react";
import { Button, PrimaryButton, DangerButton, QuietButton } from ".";

export default {
  title: "Components/Buttons",
};

export const _Button = () => <Button>Create project</Button>;
export const _PrimaryButton = () => (
  <PrimaryButton>Create project</PrimaryButton>
);

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

export const WithASelectedSize = () => (
  <>
    <Button size="small">Create project</Button>
    <Button size="medium">Create project</Button>
    <Button size="large">Create project</Button>
  </>
);

WithASelectedSize.story = {
  name: "With a selected size",
};

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

export const SetToFullWidth = () => (
  <PrimaryButton fullWidth>Create project</PrimaryButton>
);

SetToFullWidth.story = {
  name: "Set to full width",
};

export const SetToDisabled = () => (
  <PrimaryButton disabled>Create project</PrimaryButton>
);

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
