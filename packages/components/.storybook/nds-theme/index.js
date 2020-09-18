import React, { useEffect, useState } from "react";
import addons, { makeDecorator } from "@storybook/addons";
import { NDSProvider, theme as NDSTheme } from "@nulogy/components";
import { STORY_CHANGED } from "@storybook/core-events";

const ThemeWrapper = ({ loading, theme, children }) => {
  return !loading && <NDSProvider theme={theme}>{children}</NDSProvider>;
};

export default makeDecorator({
  name: "withNDSTheme",
  parameterName: "ndsThemeAddon",
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    const [theme, setTheme] = useState(NDSTheme);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      channel.on("theme-update", data => {
        setTheme(data);
        if (loading) {
          setLoading(false);
        }
      });
      channel.on(STORY_CHANGED, data => {
        setTheme(data);
      });
    }, []);

    const isLoading = loading;

    return (
      <div style={{ padding: "24px" }}>
        <ThemeWrapper loading={loading} theme={theme}>
          {getStory(context)}
        </ThemeWrapper>
      </div>
    );
  }
});
