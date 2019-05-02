import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import NDSProvider from '../src/NDSProvider/NDSProvider';
import theme from "../src/theme";

const grid = {
  base: { colour: 'hsla(120, 100%, 100%, 0.4)', size: `${theme.space.x1}` },
  major: { colour: 'hsla(120, 100%, 100%, 0.5)', size: `${theme.space.x3}`},
}

const gridStyles = {
  backgroundImage: `
    linear-gradient(${grid.major.colour} 1px, transparent 1px),
    linear-gradient(90deg, ${grid.major.colour} 1px, transparent 1px),
    linear-gradient(${grid.base.colour} 1px, transparent 1px),
    linear-gradient(90deg, ${grid.base.colour} 1px, transparent 1px)`,
  backgroundSize: `
    ${grid.major.size} ${grid.major.size},
    ${grid.major.size} ${grid.major.size},
    ${grid.base.size} ${grid.base.size},
    ${grid.base.size} ${grid.base.size}
  `,
  backgroundPosition: '-1px -1px',
  padding: `${grid.major.size}`,
  minHeight: `100vh`,
}

addDecorator((story) => (
  <div style={gridStyles}>
    {story()}
  </div>
))

addDecorator(withBackgrounds([
  { name: 'none', value: '', default: true },
  { name: 'grid', value: `${theme.colors.lightGrey}` },
]));

const req = require.context('../src', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator((story) => (
  <NDSProvider>
    {story()}
  </NDSProvider>
))

configure(loadStories, module);
