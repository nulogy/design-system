import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import backgrounds from '@storybook/addon-backgrounds';
import tokens from '@nulogy/tokens';
import withStyles from '@sambego/storybook-styles';
import './stories.css.js';

setOptions({
  name: 'Nulogy Design System',
  addonPanelInRight: true,
});

addDecorator(withThemesProvider([tokens]));

const gridMarks = [
  tokens.font.lineHeight.target.medium + 'px',
  tokens.space.x1 + 'px'
];

const gridColours = [
  'hsla(120, 100%, 100%, 0.5)',
  'hsla(120, 100%, 100%, 0.4)'
];

addDecorator(withStyles({
  backgroundImage: `linear-gradient(${gridColours[0]} 1px, transparent 1px),
    linear-gradient(90deg, ${gridColours[0]} 1px, transparent 1px),
    linear-gradient(${gridColours[1]} 1px, transparent 1px),
    linear-gradient(90deg, ${gridColours[1]} 1px, transparent 1px)`,
	backgroundSize: `${gridMarks[0]} ${gridMarks[0]}, ${gridMarks[0]} ${gridMarks[0]}, ${gridMarks[1]} ${gridMarks[1]}, ${gridMarks[1]} ${gridMarks[1]}`,
  backgroundPosition: '-1px -1px',
  borderTop: '1px solid red',
  marginTop: '-1px'
}));

const bgs = [
  { name: 'none', value: '', default: true },
  { name: 'grid', value: 'hsla(187, 46%, 92%, 1)' },
  ...Object.entries(tokens.colour.neutral).map(([name, value]) => ({ name: `neutral[${name}]`, value })),
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
