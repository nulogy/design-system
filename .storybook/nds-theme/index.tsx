import React from "react";
import { select } from "@storybook/addon-knobs";
import { NDSProvider } from "../../src";
import { ALL_NDS_LOCALES } from "../../src/locales.const";
import { ComponentVariant } from "../../src/NDSProvider/ComponentVariantContext";
import { useLocalStorage } from "./useLocalStorage/useLocalStorage";

const localeKnobOptions = ALL_NDS_LOCALES.reduce(
  (obj, i) => ({
    ...obj,
    [`${i.label} "${i.value}"`]: i.value,
  }),
  {}
);

const StorybookNDSProvider = ({ children }) => {
  const [themeVariant] = useLocalStorage<ComponentVariant>("nds-sb-theme-variant", "desktop");

  return (
    <NDSProvider locale={select("NDSProvider Locale", localeKnobOptions, "en_US")} variant={themeVariant}>
      {children}
    </NDSProvider>
  );
};

export default StorybookNDSProvider;
