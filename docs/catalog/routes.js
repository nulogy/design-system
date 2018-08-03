import { pageLoader } from 'catalog';
import { colour } from '@nulogy/tokens';
import colourConvert from 'color-convert';

const getColourName = (key, name, notes) => `${key}.${name} ${notes[name] || ''}`;

const mergeNotesWithBase = ((base, name, value, notes) => (base.value && base.value === value) ? { ...notes, [name]: base.name } : notes);

const mapColours = (key, notes = {}) => {
  const base = {
    name: `(${key}.base)`,
    value: colour[key].base, // '#0E77D2'
  };
  return Object.entries(colour[key])
    .filter(([name]) => name !== 'base')
    .map(([name, value]) => ({ name: getColourName(key, name, mergeNotesWithBase(base, name, value, notes)), value }));
  }

const toRGB = hex => {
  const rgb = colourConvert.hex.rgb(hex);
  return rgb.join(', ')
}

const getAlias = (colourName, hex, scale) => {
  const alias = scale.find(([name, value]) => colourName !== 'base' && name !== colourName && value === hex);
  return alias && alias[0];
}

const addPrefix = (pre, str) => str &&  `${pre}.${str}`;

const mapRow = prefix => ([colourName, hex], _, scale) => ({
  Token: addPrefix(prefix, colourName),
  Alias: addPrefix(prefix, getAlias(colourName, hex, scale)),
  HEX: hex,
  RGB: toRGB(hex)
})

const baseRows = Object.entries(colour)
  .filter(([_, value]) => typeof value === 'string')
  .map(mapRow('colour'));

const scaleRows = Object.entries(colour)
  .filter(([_, value]) => typeof value !== 'string')
  .reduce((result, [scaleName, scale]) => ([
    ...result,
    ...Object.entries(scale).map(mapRow(`colour.${scaleName}`))
  ]), [])

const colourTokenTableRows = [ ...baseRows, ...scaleRows]

const colourImports = {
  neutral: mapColours('neutral', { 100: '(white)', 900: '(black)'}),
  blue: mapColours('blue'),
  yellow: mapColours('yellow'),
  green: mapColours('green'),
  red: mapColours('red'),
  colourTokenTableRows: colourTokenTableRows,
};

export default [
  {
    path: '/',
    title: 'Welcome',
    content: pageLoader(() => import('../../README.md'))
  },
  {
    title: 'Visual Style',
    pages: [
      {
        path: '/visual_style/colour',
        title: 'Colour',
        content: pageLoader(() => import('./visual_style/colour.md')),
        imports: colourImports
      },
      {
        path: '/visual_style/typography',
        title: 'Typography',
        content: pageLoader(() => import('./visual_style/typography.md'))
      },
      {
        path: '/visual_style/spacing',
        title: 'Spacing',
        content: pageLoader(() => import('./visual_style/spacing.md'))
      },
      {
        path: '/visual_style/iconography',
        title: 'Iconography',
        content: pageLoader(() => import('./visual_style/iconography.md'))
      },
    ]
  },
  {
    title: 'Components',
    pages: [
      {
        path: '/components/button',
        title: 'Button',
        content: pageLoader(() => import('./components/button.md')),
        imports: {
          Button: require('@nulogy/components').Button
        }
      }
    ]
  },
  {
    title: 'Tokens',
    path: '/tokens',
    content: pageLoader(() => import('./tokens/tokens.md'))
  },
  {
    title: 'Getting Started',
    pages: [
      {
        path: '/getting_started/setup',
        title: 'Set up',
        content: pageLoader(() => import('./getting_started/setup.md'))
      },
      {
        path: '/getting_started/deploying',
        title: 'Deploying to the web',
        content: pageLoader(() => import('./getting_started/deploying.md'))
      },
    ]
  },
];
