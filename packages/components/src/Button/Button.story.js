import React from "react";
import { storiesOf } from "@storybook/react";
import { Button, PrimaryButton, DangerButton, QuietButton } from ".";

storiesOf("Components/Buttons", module)
  .add("Button", () => <Button>Create project</Button>)
  .add("PrimaryButton", () => <PrimaryButton>Create project</PrimaryButton>)
  .add("DangerButton", () => <DangerButton>Delete project</DangerButton>)
  .add("QuietButton", () => <QuietButton>Create project</QuietButton>)
  .add("With a selected size", () => (
    <>
      <Button size="small">Create project</Button>
      <Button size="medium">Create project</Button>
      <Button size="large">Create project</Button>
    </>
  ))
  .add("With a selected Icon", () => (
    <>
      <Button icon="add" iconSide="left">
        Create project
      </Button>
      <Button icon="add" iconSide="right">
        Create project
      </Button>
    </>
  ))
  .add("Set to full width", () => <PrimaryButton fullWidth>Create project</PrimaryButton>)
  .add("Set to disabled", () => <PrimaryButton disabled>Create project</PrimaryButton>)
  .add("As a link", () => (
    <PrimaryButton asLink href="/">
      Create project
    </PrimaryButton>
  ));
