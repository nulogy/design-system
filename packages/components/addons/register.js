import React, { useState } from "react";
import { addons } from "@storybook/addons";
import { useChannel, useAddonState } from "@storybook/api";
import { STORY_CHANGED } from "@storybook/core-events";
import { AddonPanel } from "@storybook/components";
import { Input, NDSProvider, Heading2, theme, Box } from "@nulogy/components";

const MyPanel = () => {
  const [state, setState] = useAddonState("my/addon", "initial state");
  const emit = useChannel({
    STORY_RENDERED: id => {
      /* do something */
    },
    "my/customEvent": () => {
      /* so something */
    }
  });

  const onChange = (group, prop) => e => {
    const value = e.target.value;
    emit("theme-update", {
      [group]: {
        [prop]: value
      }
    });
  };

  return (
    <NDSProvider>
      <Box width="300px" px="x2">
        {Object.keys(theme).map(group => (
          <Box py="x2" key={group}>
            <Heading2 textTransform="capitalize">{group}</Heading2>
            {Object.keys(theme[group]).map(prop => (
              <Input labelText={prop} onChange={onChange(group, prop)} mb="x1" key={prop} />
            ))}
          </Box>
        ))}
      </Box>
    </NDSProvider>
  );
};

// Register the addon with a unique name.
addons.register("ndstheme/addon", api => {
  // Also need to set a unique name to the panel.
  addons.addPanel("ndstheme/addon/panel", {
    title: "Custom Theme",
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <MyPanel />
      </AddonPanel>
    )
  });
});
