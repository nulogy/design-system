import React from "react";
import { storiesOf } from "@storybook/react";
import Toggle from "./Toggle";

const onToggleDemo = (toggled, id) => {
  const message = "Toggle id: (" + id + ") has been turned " + (toggled ? "on!" : "off!");
  console.log(message);
};

storiesOf("Toggle", module)
  .add("Toggle", () => (
    <React.Fragment> 
      <Toggle 
        id = "toggle1" 
        onToggle = {onToggleDemo}
        onText = "on"
        offText = "off"
      />
      <Toggle 
        id = "toggle2" 
        onToggle = {onToggleDemo}
        onText = "on"
        offText = "off"
      />      
      <Toggle 
        id = "toggle3" 
        onToggle = {onToggleDemo}
        onText = "on"
        offText = "off"
      />
    </React.Fragment>
  ));
