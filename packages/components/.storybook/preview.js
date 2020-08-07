import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { create } from "@storybook/theming";
import { withA11y } from "@storybook/addon-a11y";
import { select } from "@storybook/addon-knobs";
import { withPerformance } from "storybook-addon-performance";
import NDSProvider from "../src/NDSProvider/NDSProvider";
import theme from "../src/theme";
import { ALL_NDS_LOCALES } from "../src/locales.const";
import withNDSTheme from "../addons/index";

const localeKnobOptions = ALL_NDS_LOCALES.reduce(
  (obj, i) => ({
    ...obj,
    [`${i.label} "${i.value}"`]: i.value
  }),
  {}
);

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

// withPerformance must come after the Story wrapper or variables from the provider will be undefined
addDecorator(withPerformance);

addDecorator(withNDSTheme);
