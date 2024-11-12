import { createGlobalStyle } from "styled-components";
import { GlobalStylesProps } from "./GlobalStyles";

const ModalStyleOverride = createGlobalStyle(({ theme, locale }: GlobalStylesProps) => {
  const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
  return {
    ".ReactModal__Content, [data-reach-dialog-content]": {
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
      "*": { boxSizing: "border-box" },
      color: theme.colors.black,
      fontFamily,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
      img: {
        maxWidth: "100%",
        height: "auto",
      },
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
});

export default ModalStyleOverride;
