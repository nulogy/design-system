import React from "react";
import { storiesOf } from "@storybook/react";
import { IconicButton } from "../index";

storiesOf("IconicButton", module)
  .add("without a label", () => <IconicButton icon="delete" />)
  .add("with label", () => <IconicButton icon="delete">Delete</IconicButton>)
  .add("with a long label", () => (
    <IconicButton icon="user">I am an Iconic Button with a really really really long label</IconicButton>
  ))
  .add("set to disabled", () => (
    <>
      <IconicButton icon="cancel" disabled>
        Cancel
      </IconicButton>
      <IconicButton icon="lock" disabled>
        Lock
      </IconicButton>
    </>
  ))
  .add("with a hidden label", () => (
    <IconicButton ml="x6" labelHidden icon="user">
      Hidden Label
    </IconicButton>
  ));
