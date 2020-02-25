import React, { useState } from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { create } from "@storybook/theming";
import NDSProvider from "../src/NDSProvider/NDSProvider";
import theme from "../src/theme";
import { withA11y } from "@storybook/addon-a11y";
import { select, withKnobs } from "@storybook/addon-knobs";

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

addDecorator(withA11y);

addParameters({
  viewport: { viewports: newViewports },
  options: {
    theme: create({
      gridCellSize: 8
    })
  }
});

addDecorator(withKnobs);

addDecorator(story => {
  return (
    <div style={{ padding: theme.space.x3 }}>
      <NDSProvider locale={select("NDSProvider Locale", ["en", "fr"], "en")}>{story()}</NDSProvider>
    </div>
  );
});

configure(loadStories, module);
