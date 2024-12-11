import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { useNDSTheme } from "./useNDSTheme";

export default function NDSThemeProvider({ customTheme, children }) {
  const variant = useComponentVariant();
  const theme = useNDSTheme(variant, customTheme);

  return (
    <StyleSheetManager enableVendorPrefixes shouldForwardProp={shouldForwardProp}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}

function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
    return isPropValid(propName);
  }
  return true;
}
