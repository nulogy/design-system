import React from "react";
import { Switch } from "./";

export default {
  title: "Components/Switch",
};

export const _Switch = () => (
  <Switch id="switch" value="default-switch" data-testid="switch">
    Default Switch
  </Switch>
);

_Switch.story = {
  name: "Default Switch",
};

export const SelectedSwitch = () => (
  <Switch id="switch" selected value="selected-switch">
    This is a selected switch
  </Switch>
);

SelectedSwitch.story = {
  name: "Selected Switch Button ",
};

export const UnSelectedSwitch = () => <Switch value="unselected-switch">This is an unselected Switch</Switch>;

UnSelectedSwitch.story = {
  name: "Unselected Switch Button",
};
