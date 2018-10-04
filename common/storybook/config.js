import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import backgrounds from '@storybook/addon-backgrounds';
import tokens from '@nulogy/tokens';
import './stories.css.js';

setOptions({
  name: 'Nulogy Design System',
  addonPanelInRight: true,
});

addDecorator(withThemesProvider([tokens]));

const bgs = [
  { name: 'white', value: tokens.colour.white, default: true },
  ...Object.entries(tokens.colour.neutral).map(([name, value]) => ({ name, value })),
  { name: 'black', value: tokens.colour.black }
];

addDecorator(
  backgrounds(bgs)
);

export default requireContext => {
  function loadStories() {
    // iterate on all the stories and require them
    requireContext.keys().forEach(story => requireContext(story));
  }

  configure(loadStories, module);
}
