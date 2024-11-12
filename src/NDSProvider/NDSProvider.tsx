import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { ThemeType } from "../theme";
import NDSThemeProvider from "../theme/NDSThemeProvider";
import ComponentVariantContextProvider, { ComponentVariant } from "./ComponentVariantContext";
import FutureFlagsContextProvider, { FutureFlags } from "./FutureFlagsContext";
import GlobalStylesComposer from "./GlobalStylesComposer";
import { LocaleContext } from "./LocaleContext";

type NDSProviderProps = {
  theme?: ThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: React.ReactNode;
  variant?: ComponentVariant;
  futureFlags?: FutureFlags;
};

function NDSProvider({
  theme: customTheme,
  children,
  disableGlobalStyles = false,
  locale = "en_US",
  variant = "desktop",
  futureFlags = {
    newDesktopTypographyScale: false,
  },
}: NDSProviderProps) {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale }}>
      <FutureFlagsContextProvider futureFlags={futureFlags}>
        <ComponentVariantContextProvider variant={variant}>
          <I18nextProvider i18n={i18n}>
            <NDSThemeProvider customTheme={customTheme}>
              <GlobalStylesComposer locale={locale} disableGlobalStyles={disableGlobalStyles}>
                {children}
              </GlobalStylesComposer>
            </NDSThemeProvider>
          </I18nextProvider>
        </ComponentVariantContextProvider>
      </FutureFlagsContextProvider>
    </LocaleContext.Provider>
  );
}

export default NDSProvider;
