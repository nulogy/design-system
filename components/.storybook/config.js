import React from 'react';
import { ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import theme from '../src/theme';
import Box from '../src/Box/Box';
import '../../css/src/nds-dev.css';
// import ThemeProvider from '../src/ThemeProvider/ThemeProvider';

const req = require.context('../src', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <Box p={2}>
      {story()}
    </Box>
  </ThemeProvider>
))

configure(loadStories, module);