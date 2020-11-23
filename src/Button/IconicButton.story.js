import React from "react";
import { IconicButton } from "../index";

export default {
  title: "Components/IconicButton",
};

export const WithoutALabel = () => <IconicButton icon="delete" />;

WithoutALabel.story = {
  name: "without a label",
};

export const WithLabel = () => (
  <IconicButton icon="delete">Delete</IconicButton>
);

WithLabel.story = {
  name: "with label",
};

export const WithALongLabel = () => (
  <IconicButton icon="user">
    I am an Iconic Button with a really really really long label
  </IconicButton>
);

WithALongLabel.story = {
  name: "with a long label",
};

export const SetToDisabled = () => (
  <>
    <IconicButton icon="cancel" disabled>
      Cancel
    </IconicButton>
    <IconicButton icon="lock" disabled>
      Lock
    </IconicButton>
  </>
);

SetToDisabled.story = {
  name: "set to disabled",
};

export const WithAHiddenLabel = () => (
  <IconicButton ml="x6" labelHidden icon="user">
    Hidden Label
  </IconicButton>
);

WithAHiddenLabel.story = {
  name: "with a hidden label",
};

export const WithACustomSize = () => (
  <IconicButton icon="user" iconSize="50px" labelHidden>
    I am an Iconic Button
  </IconicButton>
);

WithACustomSize.story = {
  name: "with a custom size",
};
