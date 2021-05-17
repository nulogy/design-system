/* eslint-disable react/display-name, react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import addons from "@storybook/addons";
import { STORY_CHANGED } from "@storybook/core-events";
import { select } from "@storybook/addon-knobs";
import { NDSProvider, theme as NDSTheme } from "../../src";
import { ALL_NDS_LOCALES } from "../../src/locales.const";

const localeKnobOptions = ALL_NDS_LOCALES.reduce(
  (obj, i) => ({
    ...obj,
    [`${i.label} "${i.value}"`]: i.value,
  }),
  {}
);

const withNDSProvider = (story) => {
  const channel = addons.getChannel();
  const [theme, setTheme] = useState(NDSTheme);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    channel.on("theme-update", (data) => {
      setTheme(data);
      if (loading) {
        setLoading(false);
      }
    });
    channel.on(STORY_CHANGED, (data) => {
      setTheme(data);
    });
  }, [setLoading, channel, loading]);

  return (
    !loading && (
      <NDSProvider
        locale={select("NDSProvider Locale", localeKnobOptions, "en_US")}
        theme={theme}
      >
        {story}
      </NDSProvider>
    )
  );
};

export default withNDSProvider;
/* eslint-enable */
