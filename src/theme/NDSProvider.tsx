import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { theme as defaultTheme, type Theme } from '.';
import i18n from '../i18n';
import { LocaleProvider } from '../i18n/LocaleContext';
import { ComponentSizeContextProvider, type ComponentSize } from './ComponentSize';
import GlobalStyles from './GlobalStyles';
import { mergeTheme } from './mergeTheme';

export type NDSProviderProps = {
  theme?: Partial<Theme>;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: React.ReactNode;
  size?: ComponentSize;
};

const NDSProvider = ({
  theme: userProvidedTheme = {},
  disableGlobalStyles = false,
  locale,
  size,
  children,
}: NDSProviderProps) => {
  const theme = mergeTheme(defaultTheme, userProvidedTheme);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <LocaleProvider locale={locale}>
      <ComponentSizeContextProvider size={size}>
        <GlobalStyles theme={theme} locale={locale} disableGlobalStyles={disableGlobalStyles}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </I18nextProvider>
        </GlobalStyles>
      </ComponentSizeContextProvider>
    </LocaleProvider>
  );
};

export default NDSProvider;
