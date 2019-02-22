import React from "react";
import { storiesOf } from "@storybook/react";
import { IconicButton } from "../index";

storiesOf("IconicButton", module)
  .add("With label", () => (
    <IconicButton icon="delete">Delete</IconicButton>
  ))
  .add("With a long label", () => (
    <React.Fragment>
      <IconicButton icon="user">
        I am an Iconic Button with a really really really long label
      </IconicButton>
    </React.Fragment>
  ))
  .add("Disabled", () => (
    <React.Fragment>
      <IconicButton icon="cancel" disabled>Cancel</IconicButton>
      <IconicButton icon="lock" disabled>Lock</IconicButton>
    </React.Fragment>
  ));
