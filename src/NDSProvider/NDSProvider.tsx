import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import defaultTheme, { spaciousTheme } from "../theme";
import i18n from "../i18n";
import { ThemeType, DefaultNDSThemeType } from "../theme.type";
import { LocaleContext } from "./LocaleContext";
import { mergeThemes } from "./mergeThemes.util";
import GlobalStyles from "./GlobalStyles";
import ModalStyleOverride from "./ModalStyleOverride";
import Reset from "./Reset";

type NDSProviderProps = {
  theme?: ThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: any;
  density?: "spacious" | "default"
};

type AllNDSGlobalStylesProps = {
  theme?: DefaultNDSThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: any;
};

const themes = {
  default: defaultTheme,
  spacious: spaciousTheme,
} as const;

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

const NDSProvider = (props: NDSProviderProps) => {
  const { disableGlobalStyles = false, locale = "en_US", density, theme = {}, children } = props

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  const selectedTheme = mergeThemes(defaultTheme, themes[density])
  // const mergedTheme = mergeThemes(selectedTheme, theme);

  return (
    <LocaleContext.Provider value={{ locale }}>
      <AllNDSGlobalStyles theme={selectedTheme} locale={locale} disableGlobalStyles={disableGlobalStyles}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
        </I18nextProvider>
      </AllNDSGlobalStyles>
    </LocaleContext.Provider>
  );
};

export default NDSProvider;
