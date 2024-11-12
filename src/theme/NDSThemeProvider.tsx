import React from "react";
import { ThemeProvider } from "styled-components";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { useNDSTheme } from "./useNDSTheme";

export default function NDSThemeProvider({ customTheme, children }) {
  const variant = useComponentVariant();
  const theme = useNDSTheme(variant, customTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
