import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import { desktopTheme } from "../theme";
import i18n from "../i18n";
import { ThemeType, DefaultNDSThemeType, Breakpoints } from "../theme.type";
import { LocaleContext } from "./LocaleContext";
import { mergeThemes } from "./mergeThemes.util";
import GlobalStyles from "./GlobalStyles";
import ModalStyleOverride from "./ModalStyleOverride";
import Reset from "./Reset";
import ComponentSizeContextProvider, { ComponentSize } from "./ComponentSizeContext";

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
  children?: any;
  size?: ComponentSize;
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

const NDSProvider: React.FC<React.PropsWithChildren<NDSProviderProps>> = ({
  theme,
  children,
  disableGlobalStyles = false,
  locale = "en_US",
  size = "medium",
}) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  const mergedTheme = mergeThemes(desktopTheme, theme);
  const themeWithBreakpoints = { ...mergedTheme, breakpoints: buildBreakPoints(mergedTheme.breakpoints) };

  return (
    <LocaleContext.Provider value={{ locale }}>
      <ComponentSizeContextProvider size={size}>
        <AllNDSGlobalStyles theme={themeWithBreakpoints} locale={locale} disableGlobalStyles={disableGlobalStyles}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={themeWithBreakpoints}>{children}</ThemeProvider>
          </I18nextProvider>
        </AllNDSGlobalStyles>
      </ComponentSizeContextProvider>
    </LocaleContext.Provider>
  );
};

export default NDSProvider;
