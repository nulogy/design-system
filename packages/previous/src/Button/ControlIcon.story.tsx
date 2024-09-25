import React from "react";
import { action } from "@storybook/addon-actions";
import { ControlIcon } from "../index";

export default {
  title: "Components/ControlIcon",
};

export const _ControlIcon = () => <ControlIcon icon="close" label="close" onClick={action("clicked")} />;
export const Disabled = () => <ControlIcon icon="close" label="close" disabled onClick={action("clicked")} />;
export const Toggled = () => <ControlIcon icon="close" label="close" toggled onClick={action("clicked")} />;
