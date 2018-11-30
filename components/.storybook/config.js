import { configure } from '@storybook/react';

function loadStories() {
  require('../src/Link/Link.story.js');
}

configure(loadStories, module);