import { pageLoader } from 'catalog';
import { colour } from '@nulogy/tokens';

const getColourName = (key, name, notes) => `${key}.${name} ${notes[name] || ''}`;
const mapColours = (key, notes = {}) =>
  Object.entries(colour[key])
    .filter(([name]) => name !== 'base')
    .map(([name, value]) => ({ name: getColourName(key, name, notes), value }));

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
        imports: {
          neutral: mapColours('neutral', { 100: '(white)', 900: '(black)'}),
          blue: mapColours('blue', { 600: '(blue.base)'}),
          yellow: mapColours('yellow', { 600: '(yellow.base)'}),
          green: mapColours('green', { 600: '(green.base)'}),
          red: mapColours('red', { 600: '(red.base)'}),
        }
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
