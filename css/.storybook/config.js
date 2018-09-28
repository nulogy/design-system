import configureStorybook from '@nulogy/config/storybook/config';

configureStorybook(require.context(
  "../src",       // path where stories live
  true,           // recursive?
  /\.story.js$/, // story files match this pattern
));