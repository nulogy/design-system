import { configure } from '@storybook/react';

const req = require.context(
  "../src",       // path where stories live
  true,           // recursive?
  /\.story.js$/, // story files match this pattern
);

function loadStories() {
  // iterate on all the stories and require them
  req.keys().forEach(story => req(story));
}

configure(loadStories, module);
