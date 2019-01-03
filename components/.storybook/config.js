import React from 'react';
import { ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import theme from '../src/theme';
import Box from '../src/Box/Box';

import '../../css/src/nds-dev.css';

function loadStories() {
  require('../src/Box/Box.story.js');
  require('../src/Button/Button.story.js');  
  require('../src/Flex/Flex.story.js');
  require('../src/Type/Headings.story.js');
  require('../src/Link/Link.story.js');
  require('../src/Type/Text.story.js');
}

// addDecorator(withInfo)

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <Box p={2}>
      {story()}
    </Box>
  </ThemeProvider>
))

configure(loadStories, module);