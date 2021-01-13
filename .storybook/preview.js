import { create } from "@storybook/theming";
import "cypress-storybook/react";
import { theme } from "../src";

const newViewports = {
  extraSmall: {
    name: "Extra small",
    styles: {
      width: theme.breakpoints.extraSmall,
      height: "100%",
    },
  },
  small: {
    name: "Small",
    styles: {
      width: theme.breakpoints.small,
      height: "100%",
    },
  },
  medium: {
    name: "Medium",
    styles: {
      width: theme.breakpoints.medium,
      height: "100%",
    },
  },
  large: {
    name: "Large",
    styles: {
      width: theme.breakpoints.large,
      height: "100%",
    },
  },
  extraLarge: {
    name: "Extra Large",
    styles: {
      width: theme.breakpoints.extraLarge,
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

export const decorators = [(Story) => withNDSTheme(Story())];