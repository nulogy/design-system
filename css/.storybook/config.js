import { configure } from '@storybook/html';
import '../src/nds-dev.css';

configure(loadStories, module);

configureStorybook(require.context(
    "../src/scss/",  // path where stories live
    true,           // recursive?
    /\.story.js$/, // story files match this pattern
  ));
