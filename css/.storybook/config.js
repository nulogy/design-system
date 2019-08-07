import { configure, addParameters } from "@storybook/html";
import { create } from "@storybook/theming";
import "../src/nds.css";
import { theme } from "../index";

const req = require.context("../src/scss", true, /\.story\.js$/);

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
      width: theme.breakpoint.small,
      height: "100%"
    }
  },
  medium: {
    name: "Medium",
    styles: {
      width: theme.breakpoint.medium,
      height: "100%"
    }
  },
  large: {
    name: "Large",
    styles: {
      width: theme.breakpoint.large,
      height: "100%"
    }
  },
  extraLarge: {
    name: "Extra large",
    styles: {
      width: theme.breakpoint.extraLarge,
      height: "100%"
    }
  }
};

addParameters({
  viewport: { viewports: newViewports },
  options: {
    theme: create({
      gridCellSize: 8
    })
  }
});

configure(loadStories, module);
