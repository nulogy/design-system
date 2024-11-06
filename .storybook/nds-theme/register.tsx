// .storybook/my-addon/register.js

import React from "react";
import { addons, types, RenderOptions } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { Box, Flex, NDSProvider, Heading3, Heading2, QuietButton } from "../../src";
import { ComponentVariant } from "../../src/NDSProvider/ComponentVariantContext";
import { ThemeOption, ThemeSelect } from "./ThemeInput";
import { useLocalStorage } from "./useLocalStorage/useLocalStorage";

const ADDON_ID = "ndsThemeAddon";
const PANEL_ID = `${ADDON_ID}/panel`;

const DEFAULT_THEME_VARIANT = "desktop";

const ThemePanel = () => {
  const [themeVariant, setThemeVariant] = useLocalStorage<ComponentVariant>(
    "nds-sb-theme-variant",
    DEFAULT_THEME_VARIANT
  );

  const onVariantChange = (e) => {
    const variant = e.target.value;
    setThemeVariant(variant);
  };

  const reset = () => {
    setThemeVariant(DEFAULT_THEME_VARIANT);
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
    </NDSProvider>
  );
};

const ThemeAddonPanel = ({ active, key }: RenderOptions) => (
  <AddonPanel key={key} active={Boolean(active)}>
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
