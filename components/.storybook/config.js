import React from 'react';
import { ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import theme from '../src/theme';
import Box from '../src/Box/Box';
import '../../css/src/nds-dev.css';
// import ThemeProvider from '../src/ThemeProvider/ThemeProvider';
import withStyles from "@sambego/storybook-styles";

function loadStories() {
  require('../src/Box/Box.story.js');
  require('../src/Button/Button.story.js');
  require('../src/Flex/Flex.story.js');
  require('../src/Type/Headings.story.js');
  require('../src/Link/Link.story.js');
  require('../src/Type/Text.story.js');
}

addDecorator(withStyles({
  backgroundSize: '8px 8px',
  backgroundImage: 'linear-gradient(to right, transparent 7px, #F0F2F5 1px), linear-gradient(to bottom, transparent 7px, #F0F2F5 1px)',
  minHeight: 'calc(100vh - 32px)',
}));

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <Box p={2}>
      {story()}
    </Box>
  </ThemeProvider>
))

configure(loadStories, module);
