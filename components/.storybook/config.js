import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import NDSProvider from "../src/NDSProvider/NDSProvider";
import theme from "../src/theme";

const req = require.context("../src", true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const newViewports = {
  extraSmall: {
    name: "Extra small",
    styles: {
      width: "320px",
      height: "100%"
    }
  },
  small: {
    name: "Small",
    styles: {
      width: "768px",
      height: "100%"
    }
  },
  medium: {
    name: "Medium",
    styles: {
      width: "1024px",
      height: "100%"
    }
  },
  large: {
    name: "Large",
    styles: {
      width: "1360px",
      height: "100%"
    }
  },
  extraLarge: {
    name: "Extra large",
    styles: {
      width: "1920px",
      height: "100%"
    }
  }
};

addParameters({
  viewport: { viewports: newViewports }
});

addDecorator(story => (
  <div style={{ padding: theme.space.x3 }}>
    <NDSProvider>{story()}</NDSProvider>
  </div>
));

configure(loadStories, module);
