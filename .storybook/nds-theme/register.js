// .storybook/my-addon/register.js

import React, { useEffect } from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { useChannel, useAddonState } from "@storybook/api";
import { STORY_CHANGED } from "@storybook/core-events";
import { Box, Flex, NDSProvider, Heading3, Heading2 } from "../../src";
import { desktopTheme as NDSTheme } from "../../src/theme";
import ThemeKey from "./ThemeKey";
import { ThemeInput, ThemeOption, ThemeSelect } from "./ThemeInput";
import ThemeColorInput from "./ThemeColorInput";

const ADDON_ID = "ndsThemeAddon";
const PANEL_ID = `${ADDON_ID}/panel`;

export const EVENTS = {
  UPDATE: "theme-update",
  VARIANT_UPDATE: "theme-variant-update",
};

const composeTheme = (data, theme) => {
  const themeGroup = Object.keys(data)[0];
  const key = Object.keys(data[themeGroup])[0];
  const newValue = data[themeGroup][key];
  const newTheme = {
    ...theme,
    [themeGroup]: {
      ...theme[themeGroup],
      ...(newValue && data[themeGroup]),
    },
  };
  return newTheme;
};

const ThemePanel = () => {
  const [themeVariant, setThemeVariant] = useAddonState("ndsThemeVariantAddon", "medium");
  const [theme, setTheme] = useAddonState("ndsThemeAddon", NDSTheme);
  const channel = addons.getChannel();
  const emit = useChannel({});

  useEffect(() => {
    channel.on(STORY_CHANGED, () => {
      emit(EVENTS.VARIANT_UPDATE, themeVariant);
      emit(EVENTS.UPDATE, theme);
    });
  });

  const onChange = (group, prop) => (e) => {
    const value = e.target.value;
    const nextTheme = composeTheme(
      {
        [group]: {
          [prop]: value,
        },
      },
      theme
    );
    setTheme(nextTheme);
    emit(EVENTS.UPDATE, nextTheme);
  };

  const onChangeColor = (group, prop) => (e) => {
    const value = e.hex;
    const nextTheme = composeTheme(
      {
        [group]: {
          [prop]: value,
        },
      },
      theme
    );
    setTheme(nextTheme);
    emit(EVENTS.UPDATE, nextTheme);
  };

  const onVariantChange = (e) => {
    setThemeVariant(e.target.value);
    emit(EVENTS.VARIANT_UPDATE, e.target.value);
  };

  return (
    <NDSProvider>
      <Box m="x3">
        <Heading2 fontWeight="light">Variant</Heading2>
        <ThemeSelect value={themeVariant} onChange={onVariantChange}>
          <ThemeOption value="medium">Medium</ThemeOption>
          <ThemeOption value="large">Large</ThemeOption>
        </ThemeSelect>
      </Box>
      {Object.keys(NDSTheme).map((group) => (
        <Box m="x3" key={group} maxWidth="500px">
          <Heading3 fontWeight="light">{group}</Heading3>
          {Object.keys(NDSTheme[group]).map((prop) => (
            <Flex alignItems="center" mb="x2" key={`${group}-${prop}`}>
              <ThemeKey>{prop}</ThemeKey>
              {group === "colors" ? (
                <ThemeColorInput color={NDSTheme[group][prop]} onChange={onChangeColor(group, prop)} />
              ) : (
                <ThemeInput defaultValue={NDSTheme[group][prop]} onChange={onChange(group, prop)} />
              )}
            </Flex>
          ))}
        </Box>
      ))}
    </NDSProvider>
  );
};

const ThemeAddonPanel = ({ active, key }) => (
  <AddonPanel key={key} active={active}>
    <ThemePanel />
  </AddonPanel>
);

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Theme",
    skipIfNoParametersOrOptions: false,
    render: ThemeAddonPanel,
  });
});
