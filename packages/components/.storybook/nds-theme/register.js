// .storybook/my-addon/register.js

import React from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { useChannel, useAddonState } from "@storybook/api";
import { Box, Flex, NDSProvider, Heading3, theme as NDSTheme } from "@nulogy/components";
import { STORY_CHANGED } from "@storybook/core-events";
import ThemeKey from "./ThemeKey";
import ThemeInput from "./ThemeInput";

const ADDON_ID = "ndsThemeAddon";
const PANEL_ID = `${ADDON_ID}/panel`;

const composeTheme = (data, theme) => {
  const themeGroup = Object.keys(data)[0];
  const key = Object.keys(data[themeGroup])[0];
  const newValue = data[themeGroup][key];
  const newTheme = {
    ...theme,
    [themeGroup]: {
      ...theme[themeGroup],
      ...(newValue && data[themeGroup])
    }
  };
  return newTheme;
};

const MyPanel = () => {
  const [theme, setTheme] = useAddonState("ndsThemeAddon", NDSTheme);
  const emit = useChannel({
    [STORY_CHANGED]: () => {
      emit("theme-update", theme);
    }
  });

  const onChange = (group, prop) => e => {
    const value = e.target.value;
    const nextTheme = composeTheme(
      {
        [group]: {
          [prop]: value
        }
      },
      theme
    );
    console.log(nextTheme);
    setTheme(nextTheme);
    emit("theme-update", nextTheme);
  };

  return (
    <NDSProvider>
      {Object.keys(NDSTheme).map(group => (
        <Box m="x3" key={group} maxWidth="500px">
          <Heading3 fontWeight="light">{group}</Heading3>
          {Object.keys(NDSTheme[group]).map(prop => (
            <>
              <Flex alignItems="center" mb="x2" key={prop}>
                <ThemeKey>{prop}</ThemeKey>
                <ThemeInput defaultValue={NDSTheme[group][prop]} onChange={onChange(group, prop)} />
              </Flex>
            </>
          ))}
        </Box>
      ))}
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
