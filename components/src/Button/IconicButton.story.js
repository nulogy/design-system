import React from "react";
import { storiesOf } from "@storybook/react";
import { IconicButton } from "../index";

storiesOf("IconicButton", module)
  .add("with label", () => (
    <IconicButton ml="60px" icon="delete">
      Delete
    </IconicButton>
  ))
  .add("with a long label", () => (
    <IconicButton icon="user">I am an Iconic Button with a really really really long label</IconicButton>
  ))
  .add("set to disabled", () => (
    <React.Fragment>
      <IconicButton icon="cancel" disabled>
        Cancel
      </IconicButton>
      <IconicButton icon="lock" disabled>
        Lock
      </IconicButton>
    </React.Fragment>
  ))
  .add("with a hover label", () => (
    <IconicButton ml="x6" hiddenLabel icon="user">
      Hovering Label
    </IconicButton>
  ));
