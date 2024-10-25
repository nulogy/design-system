// .storybook/my-addon/register.js

import React from "react";
import { addons, types, RenderOptions } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { Box, Flex, NDSProvider, Heading3, Heading2, QuietButton } from "../../src";
import { themes } from "../../src/theme";
import ThemeKey from "./ThemeKey";
import { ThemeInput, ThemeOption, ThemeSelect } from "./ThemeInput";
import ThemeColorInput from "./ThemeColorInput";
import { useLocalStorage } from "./useLocalStorage/useLocalStorage";

const ADDON_ID = "ndsThemeAddon";
const PANEL_ID = `${ADDON_ID}/panel`;

const composeTheme = (data, theme) => {
  const themeGroup = Object.keys(data)[0];
  const key = Object.keys(data[themeGroup])[0];
  const newValue = data[themeGroup][key];
  return {
    ...theme,
    [themeGroup]: {
      ...theme[themeGroup],
      ...(newValue && data[themeGroup]),
    },
  };
};

const DEFAULT_THEME_VARIANT = "desktop";

const ThemePanel = () => {
  const [themeVariant, setThemeVariant] = useLocalStorage("nds-sb-theme-variant", DEFAULT_THEME_VARIANT);
  const [theme, setTheme] = useLocalStorage("nds-sb-theme", themes[themeVariant], {
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => JSON.parse(value),
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
  };

  const onVariantChange = (e) => {
    const variant = e.target.value;
    setThemeVariant(variant);

    const theme = themes[variant];
    setTheme(theme);
  };

  const reset = () => {
    setThemeVariant(DEFAULT_THEME_VARIANT);
    setTheme(themes.desktop);
  };

  return (
    <NDSProvider>
      <Box m="x3">
        <Flex>
          <Heading2 flexGrow={1} fontWeight="light">
            Theme
          </Heading2>
          <QuietButton size="small" onClick={reset}>
            Reset all
          </QuietButton>
        </Flex>
        <Heading3>Variant</Heading3>
        <ThemeSelect value={themeVariant} onChange={onVariantChange}>
          <ThemeOption value="desktop">Desktop</ThemeOption>
          <ThemeOption value="touch">Touch</ThemeOption>
        </ThemeSelect>
      </Box>
      {Object.keys(theme).map((group) => (
        <Box m="x3" key={group} maxWidth="500px">
          <Heading3 fontWeight="light">{group}</Heading3>
          {Object.keys(theme[group]).map((prop) => (
            <Flex alignItems="center" mb="x2" key={`${group}-${prop}`}>
              <ThemeKey>{prop}</ThemeKey>
              {group === "colors" ? (
                <ThemeColorInput color={theme[group][prop]} onChange={onChangeColor(group, prop)} />
              ) : (
                <ThemeInput value={theme[group][prop]} onChange={onChange(group, prop)} />
              )}
            </Flex>
          ))}
        </Box>
      ))}
    </NDSProvider>
  );
};

const ThemeAddonPanel = ({ active, key }: RenderOptions) => (
  <AddonPanel key={key} active={active}>
    <ThemePanel />
  </AddonPanel>
);

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Theme",
    render: ThemeAddonPanel,
  });
});
