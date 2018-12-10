import React from 'react';
import { ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import theme from '../src/theme';

import '../../css/src/nds-dev.css';

function loadStories() {
  require('../src/Link/Link.story.js');
  require('../src/Box/Box.story.js');
  require('../src/Flex/Flex.story.js');
  require('../src/Icons/Icon.story.js');  
}

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
))

configure(loadStories, module);