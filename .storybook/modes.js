import { destkop as theme } from "../src/theme";
import numberFromDimension from "../src/utils/numberFromDimension";

export const allModes = {
  touch: {
    locale: "en",
    desktopScale: "standard",
    theme: "touch",
    viewports: [theme.breakpoints.small, theme.breakpoints.medium, theme.breakpoints.large].map(numberFromDimension),
  },
  desktop: {
    locale: "en",
    desktopScale: "standard",
    theme: "desktop",
  },
  experimental: {
    locale: "en",
    desktopScale: "experimental",
    theme: "desktop",
  },
};
