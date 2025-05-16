import { AppTagType, ColorName } from "./types";

export const appTagColors: Record<AppTagType, { primary: ColorName; secondary: ColorName }> = {
  active: {
    primary: "darkGrey",
    secondary: "lightGrey",
  },
  inactive: {
    primary: "midGrey",
    secondary: "whiteGrey",
  },
  interactive: {
    primary: "blue",
    secondary: "lightBlue",
  },
};
