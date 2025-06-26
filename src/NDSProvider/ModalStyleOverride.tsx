import { createGlobalStyle } from "styled-components";

const ModalStyleOverride = createGlobalStyle<{ locale?: string }>(({ theme, locale }) => {
  const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
  return {
    ":root": {
      "--reach-dialog": 1,
    },
    ".ReactModal__Content, [data-reach-dialog-content], [data-radix-popper-content-wrapper]": {
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
