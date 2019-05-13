import React from "react";
import { configure, addDecorator } from "@storybook/react";
import NDSProvider from "../src/NDSProvider/NDSProvider";
import theme from "../src/theme";

const req = require.context("../src", true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <div style={{ padding: theme.space.x3 }}>
    <NDSProvider>{story()}</NDSProvider>
  </div>
));

configure(loadStories, module);
