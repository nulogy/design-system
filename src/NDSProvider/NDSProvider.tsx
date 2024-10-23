import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import { themes } from "../theme";
import i18n from "../i18n";
import { ThemeType, DefaultNDSThemeType, Breakpoints } from "../theme.type";
import { LocaleContext } from "./LocaleContext";
import { mergeThemes } from "./mergeThemes.util";
import GlobalStyles from "./GlobalStyles";
import ModalStyleOverride from "./ModalStyleOverride";
import Reset from "./Reset";
import ComponentVariantContextProvider, { ComponentVariant } from "./ComponentVariantContext";

export const buildBreakPoints = (breakpointsConfig: Readonly<Breakpoints>) => ({
  ...breakpointsConfig,

  // We need the map function as a polyfill because the `variant` function
  // from `styled-system` expects the breakpoints
  // to be an array and not an object
  map: (fn) => Object.values(breakpointsConfig).map(fn),
});

type NDSProviderProps = {
  theme?: ThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: React.ReactNode;
  variant?: ComponentVariant;
};

type AllNDSGlobalStylesProps = {
  theme?: DefaultNDSThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: any;
};

const AllNDSGlobalStyles = ({ theme, locale, disableGlobalStyles, children }: AllNDSGlobalStylesProps) =>
  !disableGlobalStyles ? (
    <>
      <Reset />
      <ModalStyleOverride theme={theme} locale={locale} />
      <GlobalStyles theme={theme} locale={locale}>
        {children}
      </GlobalStyles>
    </>
  ) : (
    children
  );

function NDSProvider({
  theme,
  children,
  disableGlobalStyles = false,
  locale = "en_US",
  variant = "desktop",
}: NDSProviderProps) {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  if (!(variant in themes)) {
    throw new Error(
      `Invalid variant "${variant}" provided to NDSProvider. Valid variants are: ${Object.keys(themes).join(", ")}`
    );
  }

  const themeVariant = themes[variant];
  const mergedTheme = mergeThemes(themeVariant, theme);
  const themeWithBreakpoints = { ...mergedTheme, breakpoints: buildBreakPoints(mergedTheme.breakpoints) };

  return (
    <LocaleContext.Provider value={{ locale }}>
      <ComponentVariantContextProvider variant={variant}>
        <AllNDSGlobalStyles theme={themeWithBreakpoints} locale={locale} disableGlobalStyles={disableGlobalStyles}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={themeWithBreakpoints}>{children}</ThemeProvider>
          </I18nextProvider>
        </AllNDSGlobalStyles>
      </ComponentVariantContextProvider>
    </LocaleContext.Provider>
  );
}

export default NDSProvider;
