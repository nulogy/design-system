import React, { useEffect, useState } from "react";
import addons, { makeDecorator } from "@storybook/addons";
import { NDSProvider, theme as NDSTheme } from "@nulogy/components";
import { STORY_CHANGED } from "@storybook/core-events";

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
        setTheme(data);
      });
      channel.on(STORY_CHANGED, data => {
        console.log(data);
        setTheme(data);
      });
    }, []);

    return (
      <div style={{ padding: "24px" }}>
        <NDSProvider theme={theme}>{getStory(context)}</NDSProvider>
      </div>
    );
  }
});
