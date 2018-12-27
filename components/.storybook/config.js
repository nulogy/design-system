import React from 'react';
import { ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import theme from '../src/theme';
import Box from '../src/Box/Box';

import '../../css/src/nds-dev.css';

function loadStories() {
  require('../src/Link/Link.story.js');
  require('../src/Box/Box.story.js');
  require('../src/Flex/Flex.story.js');
  require('../src/Type/Type.story.js');
}

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <Box p={1}>{story()}</Box>
  </ThemeProvider>
))

configure(loadStories, module);