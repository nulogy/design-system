import { createGlobalStyle } from "styled-components";
import {GlobalStylesProps} from "./GlobalStyles";

const ModalStyleOverride = createGlobalStyle(
  ({ theme, locale }: GlobalStylesProps) => {
    const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
    return {
      ".ReactModal__Content": {
        fontFamily,
        button: {
          fontFamily,
        },
        input: {
          fontFamily,
        },
        textarea: {
          fontFamily,
        },
      },
    };
  }
);

export default ModalStyleOverride;
