import React, { useEffect, useState } from "react";
import addons from "@storybook/addons";
import { select } from "@storybook/addon-knobs";
import { NDSProvider } from "../../src";
import { ALL_NDS_LOCALES } from "../../src/locales.const";
import { desktopTheme as NDSTheme } from "../../src/theme";
import { ComponentSize } from "../../src/NDSProvider/ComponentSizeContext";
import { EVENTS } from "./register";

const localeKnobOptions = ALL_NDS_LOCALES.reduce(
  (obj, i) => ({
    ...obj,
    [`${i.label} "${i.value}"`]: i.value,
  }),
  {}
);

const StorybookNDSProvider = ({ children }) => {
  const channel = addons.getChannel();
  const [theme, setTheme] = useState(NDSTheme);
  const [themeVariant, setThemeVariant] = useState<ComponentSize>("medium");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    channel.on(EVENTS.UPDATE, (data) => {
      setTheme(data);
      if (loading) {
        setLoading(false);
      }
    });
    channel.on(EVENTS.VARIANT_UPDATE, (data) => {
      setThemeVariant(data);
    });
  }, [setLoading, channel, loading]);

  return (
    !loading && (
      <NDSProvider locale={select("NDSProvider Locale", localeKnobOptions, "en_US")} theme={theme} size={themeVariant}>
        {children}
      </NDSProvider>
    )
  );
};

export default StorybookNDSProvider;
