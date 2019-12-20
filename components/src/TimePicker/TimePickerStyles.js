import { createGlobalStyle } from "styled-components";

import theme from "../theme";

export const TimePickerStyles = createGlobalStyle({
  ".nds-time-picker": {
    width: "130px",
    "span[class*='indicatorSeparator']": {
      visibility: "hidden"
    },
    ".nds-select--is-focused": {
      svg: {
        color: theme.colors.darkBlue
      }
    }
  }
});
