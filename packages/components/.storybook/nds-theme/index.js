import React, { useEffect, useState } from "react";
import addons, { makeDecorator } from "@storybook/addons";
import { NDSProvider, theme as NDSTheme } from "@nulogy/components";

export default makeDecorator({
  name: "withNDSTheme",
  parameterName: "ndsThemeAddon",
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    const [theme, setTheme] = useState(NDSTheme);

    useEffect(() => {
      channel.on("theme-update", data => {
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
        setTheme(newTheme);
      });
    }, []);

    return (
      <div style={{ padding: "24px" }}>
        <NDSProvider theme={theme}>{getStory(context)}</NDSProvider>
      </div>
    );
  }
});
