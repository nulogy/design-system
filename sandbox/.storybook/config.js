import configureStorybook from '@nulogy/common/storybook/config';
import '@nulogy/css';

configureStorybook(require.context(
  "../src",       // path where stories live
  true,           // recursive?
  /\.story.js$/, // story files match this pattern
));

