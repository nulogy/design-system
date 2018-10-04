import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import withBackgrounds from '@storybook/addon-backgrounds';
import withStyles from '@sambego/storybook-styles';
import tokens from '@nulogy/tokens';
import './stories.css.js';

setOptions({
  name: 'Nulogy Design System',
  addonPanelInRight: true,
});

addDecorator(withThemesProvider([tokens]));

const px = value => `${value}px`;
const grid = {
  major: { colour: 'hsla(120, 100%, 100%, 0.5)', size: tokens.font.lineHeight.target.medium },
  base: { colour: 'hsla(120, 100%, 100%, 0.4)', size: tokens.space.x1 }
}

addDecorator(withStyles({
  backgroundImage: `
    linear-gradient(${grid.major.colour} 1px, transparent 1px),
    linear-gradient(90deg, ${grid.major.colour} 1px, transparent 1px),
    linear-gradient(${grid.base.colour} 1px, transparent 1px),
    linear-gradient(90deg, ${grid.base.colour} 1px, transparent 1px)`,
  backgroundSize: `
    ${px(grid.major.size)} ${px(grid.major.size)},
    ${px(grid.major.size)} ${px(grid.major.size)},
    ${px(grid.base.size)} ${px(grid.base.size)},
    ${px(grid.base.size)} ${px(grid.base.size)}
  `,
  backgroundPosition: '-1px -1px',
  borderTop: '1px solid red',
  marginTop: '-1px',
  padding: `${px(grid.major.size)}`,
  minHeight: `calc(100vh - ${px(grid.major.size * 2)})`
}));

addDecorator(withBackgrounds([
  { name: 'none', value: '', default: true },
  { name: 'grid', value: 'hsl(187, 46%, 92%)' },
  ...Object.entries(tokens.colour.neutral).map(([name, value]) => ({ name: `neutral[${name}]`, value })),
]));

export default requireContext => {
  function loadStories() {
    // iterate on all the stories and require them
    requireContext.keys().forEach(story => requireContext(story));
  }

  configure(loadStories, module);
}
