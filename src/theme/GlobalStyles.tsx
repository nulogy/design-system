import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import React from 'react';
import type { NDSProviderProps } from './NDSProvider';

export default function GlobalStyles({ theme, locale, disableGlobalStyles, children }: Omit<NDSProviderProps, 'size'>) {
  return !disableGlobalStyles ? (
    <>
      <Reset />
      <TextStyles theme={theme} locale={locale}>
        {children}
      </TextStyles>
    </>
  ) : (
    children
  );
}

const TextStyles = styled.div<{
  locale?: string;
}>(({ theme, locale }) => {
  const fontFamily = locale === 'zh_CN' ? theme.fonts.sc : theme.fonts.base;

  return {
    color: theme.colors.black,
    fontFamily,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '*': {
      boxSizing: 'border-box',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
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
  };
});

const Reset = createGlobalStyle(() => {
  return {
    body: {
      margin: 0,
    },
  };
});
