// .storybook/my-addon/register.js

import React from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { useChannel, useAddonState } from "@storybook/api";
import { Input, NDSProvider, Heading2, theme, Box } from "@nulogy/components";

const ADDON_ID = "ndsThemeAddon";
const PANEL_ID = `${ADDON_ID}/panel`;

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
              <Input
                labelText={prop}
                onChange={onChange(group, prop)}
                mb="x1"
                key={prop}
                defaultValue={theme[group][prop]}
              />
            ))}
          </Box>
        ))}
      </Box>
    </NDSProvider>
  );
};
addons.register(ADDON_ID, api => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "ndsThemeAddon",
    skipIfNoParametersOrOptions: false,
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <MyPanel />
      </AddonPanel>
    )
  });
});
