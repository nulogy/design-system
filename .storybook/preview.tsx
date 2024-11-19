import React from "react";
import { desktop as theme } from "../src/theme";
import { ALL_NDS_LOCALES, NDSProvider } from "../src";

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
  layout: "padded",
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "desktop",
    toolbar: {
      icon: "browser",
      items: [
        { value: "desktop", title: "Desktop" },
        { value: "touch", title: "Touch" },
      ],
      dynamicTitle: true,
    },
  },
  desktopScale: {
    name: "Desktop typography scale",
    description: "Toggles between the legacy and new desktop typography scale",
    defaultValue: "legacy",
    toolbar: {
      icon: "paragraph",
      items: [
        { value: "legacy", title: "Legacy desktop scale" },
        { value: "new", title: "New desktop scale" },
      ],
      dynamicTitle: true,
    },
  },
  locale: {
    name: "Locale",
    description: "NDSProvider Locale",
    defaultValue: "en_US",
    toolbar: {
      icon: "globe",
      items: ALL_NDS_LOCALES.map((locale) => ({
        title: `${locale.label} - ${locale.value}`,
        value: locale.value,
      })),
      dynamicTitle: true,
    },
  },
};

const withThemeProvider = (Story, context) => {
  const { theme, locale, desktopScale } = context.globals;

  return (
    <NDSProvider locale={locale} variant={theme} futureFlags={{ newDesktopTypographyScale: desktopScale === "new" }}>
      <Story />
    </NDSProvider>
  );
};

export const decorators = [withThemeProvider];
