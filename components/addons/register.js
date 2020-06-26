import React from "react";
import { addons } from "@storybook/addons";
import { useChannel } from "@storybook/api";
import { STORY_CHANGED } from "@storybook/core-events";
import { AddonPanel } from "@storybook/components";

const MyPanel = () => {
  const emit = useChannel({
    STORY_RENDERED: id => {
      /* do something */
    },
    "my/customEvent": () => {
      /* so something */
    }
  });

  return <button onClick={() => emit("my/otherEvent")}>click to emit</button>;
};

// Register the addon with a unique name.
addons.register("my/addon", api => {
  // Also need to set a unique name to the panel.
  addons.addPanel("my/addon/panel", {
    title: "My Addon",
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <MyPanel />
      </AddonPanel>
    )
  });
});
