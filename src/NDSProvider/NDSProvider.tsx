import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { ThemeType } from "../theme.type";
import { LocaleContext } from "./LocaleContext";
import ComponentVariantContextProvider, { ComponentVariant } from "./ComponentVariantContext";
import GlobalStylesComposer from "./GlobalStylesComposer";
import { useNDSTheme } from "./useNDSTheme";

type NDSProviderProps = {
  theme?: ThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: React.ReactNode;
  variant?: ComponentVariant;
};

function NDSProvider({
  theme: customTheme,
  children,
  disableGlobalStyles = false,
  locale = "en_US",
  variant = "desktop",
}: NDSProviderProps) {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  const theme = useNDSTheme(variant, customTheme);

  return (
    <LocaleContext.Provider value={{ locale }}>
      <ComponentVariantContextProvider variant={variant}>
        <GlobalStylesComposer theme={theme} locale={locale} disableGlobalStyles={disableGlobalStyles}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </I18nextProvider>
        </GlobalStylesComposer>
      </ComponentVariantContextProvider>
    </LocaleContext.Provider>
  );
}

export default NDSProvider;
