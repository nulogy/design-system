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

const _colourTokenTableRows = [
  {
    Token: 'colour.neutral.100',
    Alias: null,
    HEX: colour.neutral['100'],
    RGB: '255, 255, 255'
  }
];

const toRGB = hex => {
  const rgb = colourConvert.hex.rgb(hex);
  return rgb.join(', ')
}

const mapRow = prefix => ([colourName, hex]) => ({
  Token: `${prefix}.${colourName}`,
  Alias: null,
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
    title: 'Foundation',
    pages: [
      {
        path: '/foundation/principles',
        title: 'Design Principles',
        content: pageLoader(() => import('./foundation/principles.md'))
      },
      {
        path: '/foundation/audience',
        title: 'Our Users',
        content: pageLoader(() => import('./foundation/audience.md'))
      },
      {
        path: '/foundation/environments',
        title: 'Environments',
        content: pageLoader(() => import('./foundation/environments.md'))
      }
    ]
  },
  {
    title: 'Guidelines',
    pages: [
      {
        path: '/guidlines/language',
        title: 'Language',
        content: pageLoader(() => import('./guidlines/language.md'))
      },
      {
        path: '/guidlines/colour',
        title: 'Colour',
        content: pageLoader(() => import('./guidlines/colour.md')),
        imports: colourImports
      },
      {
        path: '/guidlines/typography',
        title: 'Typography',
        content: pageLoader(() => import('./guidlines/typography.md'))
      },
      {
        path: '/guidlines/spacing',
        title: 'Spacing',
        content: pageLoader(() => import('./guidlines/spacing.md'))
      },
      {
        path: '/guidlines/iconography',
        title: 'Iconography',
        content: pageLoader(() => import('./guidlines/iconography.md'))
      },
      {
        path: '/guidlines/depth',
        title: 'Depth',
        content: pageLoader(() => import('./guidlines/depth.md'))
      },
      {
        path: '/guidlines/motion',
        title: 'Motion',
        content: pageLoader(() => import('./guidlines/motion.md'))
      },
      {
        path: '/guidlines/accessibility',
        title: 'Accessibility',
        content: pageLoader(() => import('./guidlines/accessibility.md'))
      }
    ]
  },
  {
    title: 'Components',
    pages: [
      {
        path: '/components/tokens',
        title: 'Design Tokens',
        content: pageLoader(() => import('./components/tokens.md'))
      },
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
    title: 'Getting Started',
    pages: [
      {
        path: '/getting_started/setup',
        title: 'Set up',
        content: pageLoader(() => import('./getting_started/setup.md'))
      },
      {
        path: '/getting_started/writing',
        title: 'Writing content and adding pages',
        content: pageLoader(() => import('./getting_started/writing.md'))
      },
      {
        path: '/getting_started/deploying',
        title: 'Deploying to the web',
        content: pageLoader(() => import('./getting_started/deploying.md'))
      },
      {
        path: '/getting_started/faq',
        title: 'FAQ',
        content: pageLoader(() => import('./getting_started/faq.md'))
      }
    ]
  },
];
