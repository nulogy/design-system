import * as React from 'react';
import type { Preview } from '@storybook/react';
import NDSProvider from '../src/theme/NDSProvider';
import { theme } from '../src/theme';

const VIEW_PORTS = {
  small: {
    name: 'Small',
    styles: {
      width: theme.breakpoints.small,
      height: '100%',
    },
  },
  medium: {
    name: 'Medium',
    styles: {
      width: theme.breakpoints.medium,
      height: '100%',
    },
  },
  large: {
    name: 'Large',
    styles: {
      width: theme.breakpoints.large,
      height: '100%',
    },
  },
  extraLarge: {
    name: 'Extra Large',
    styles: {
      width: theme.breakpoints.extraLarge,
      height: '100%',
    },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: VIEW_PORTS,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <NDSProvider>
        <Story />
      </NDSProvider>
    ),
  ],
};

export default preview;
