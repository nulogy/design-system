import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import NDSTheme from "../theme";
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
};

type AllNDSGlobalStylesProps = {
  theme?: DefaultNDSThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: any;
};

const AllNDSGlobalStyles = ({
  theme,
  locale,
  disableGlobalStyles,
  children,
}: AllNDSGlobalStylesProps) =>
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

const NDSProvider = ({
  theme,
  children,
  disableGlobalStyles = false,
  locale = "en_US",
}: NDSProviderProps) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);
  const mergedTheme = mergeThemes(NDSTheme, theme);
  return (
    <LocaleContext.Provider value={{ locale }}>
      <AllNDSGlobalStyles
        theme={mergedTheme}
        locale={locale}
        disableGlobalStyles={disableGlobalStyles}
      >
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={mergedTheme}>{children}</ThemeProvider>
        </I18nextProvider>
      </AllNDSGlobalStyles>
    </LocaleContext.Provider>
  );
};

export default NDSProvider;
