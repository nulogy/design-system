import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import tokens from '@nulogy/tokens';
import '@nulogy/css';
import './stories.css.js';

setOptions({
  name: 'Nulogy Design System',
  addonPanelInRight: true,
});

addDecorator(withThemesProvider([tokens]));

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
