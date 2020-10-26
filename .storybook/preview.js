import React from "react";
import { create } from "@storybook/theming";
import { select } from "@storybook/addon-knobs";
import "cypress-storybook/react";
import NDSProvider from "../src/NDSProvider/NDSProvider";
import { ALL_NDS_LOCALES } from "../src/locales.const";
import withNDSTheme from "./nds-theme";

const localeKnobOptions = ALL_NDS_LOCALES.reduce(
  (obj, i) => ({
    ...obj,
    [`${i.label} "${i.value}"`]: i.value,
  }),
  {}
);

const newViewports = {
  extraSmall: {
    name: "Extra small",
    styles: {
      width: "320px",
      height: "100%",
    },
  },
  small: {
    name: "Small",
    styles: {
      width: "768px",
      height: "100%",
    },
  },
  medium: {
    name: "Medium",
    styles: {
      width: "1024px",
      height: "100%",
    },
  },
  large: {
    name: "Large",
    styles: {
      width: "1360px",
      height: "100%",
    },
  },
  extraLarge: {
    name: "Extra large",
    styles: {
      width: "1920px",
      height: "100%",
    },
  },
};
export const parameters = {
  viewport: { viewports: newViewports },
  options: {
    theme: create({
      gridCellSize: 8,
    }),
  },
};

const ProviderWithLocale = (props) => (
  <NDSProvider
    locale={select("NDSProvider Locale", localeKnobOptions, "en_US")}
    {...props}
  />
);

export const decorators = [withNDSTheme(ProviderWithLocale)];
