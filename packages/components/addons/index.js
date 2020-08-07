import React from "react";
import addons, { makeDecorator } from "@storybook/addons";
import { NDSProvider } from "../src";

export default makeDecorator({
  name: "withMyAddon",
  parameterName: "myParameter",
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();

    // Our API above sets the notes parameter to a string,
    // which we send to the channel
    channel.emit("my/customEvent", parameters);

    console.log(getStory(context));
    // we can also add subscriptions here using channel.on('eventName', callback);

    return (
      <div style={{ padding: "24px" }}>
        <NDSProvider>{getStory(context)}</NDSProvider>
      </div>
    );
  }
});
