import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ControlIcon } from "../index";

storiesOf("Components/ControlIcon", module)
  .add("Control Icon", () => <ControlIcon icon="close" label="close" onClick={action("clicked")} />)
  .add("Disabled", () => <ControlIcon icon="close" label="close" disabled onClick={action("clicked")} />)
  .add("Toggled", () => <ControlIcon icon="close" label="close" toggled onClick={action("clicked")} />);
