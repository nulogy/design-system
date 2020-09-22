/* eslint-disable react/display-name, react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import addons, { makeDecorator } from "@storybook/addons";
import { theme as NDSTheme } from "@nulogy/components";
import { STORY_CHANGED } from "@storybook/core-events";

const withThemeWrapper = Component => ({ loading, theme, children }) => {
  return !loading && <Component theme={theme}>{children}</Component>;
};

export default Component =>
  makeDecorator({
    name: "withNDSTheme",
    parameterName: "ndsThemeAddon",
    // This means don't run this decorator if the notes decorator is not set
    skipIfNoParametersOrOptions: false,
    wrapper: (getStory, context) => {
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
      }, [channel, loading]);

      const ThemeWrapper = withThemeWrapper(Component);

      return (
        <div style={{ padding: "24px" }}>
          <ThemeWrapper theme={theme} loading={loading}>
            {getStory(context)}
          </ThemeWrapper>
        </div>
      );
    }
  });
/* eslint-enable */
