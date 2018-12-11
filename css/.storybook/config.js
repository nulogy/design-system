import { configure } from '@storybook/html';
import '../src/nds-dev.css';

function loadStories() {
  require('../src/scss/components/_buttons.story.js');
  require('../src/scss/components/_type.story.js');
  require('../src/scss/utilities/_type.story.js');
}

configure(loadStories, module);

// maybe this better? it automatic.
// configureStorybook(require.context(
//     "../src",       // path where stories live
//     true,           // recursive?
//     /\.story.js$/, // story files match this pattern
//   ));
