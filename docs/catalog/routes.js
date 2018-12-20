import { pageLoader } from 'catalog';
import * as tokens from '../../tokens/build/exports.js';

export default [
  {
    path: '/',
    title: '',
    content: pageLoader(() => import('./visual_style/welcome.md')),
  },
  {
    title: 'Visual Style',
    pages: [
      {
        path: '/visual_style/colour',
        title: 'Colour',
        content: pageLoader(() => import('./visual_style/colour.md')),
      }, {
        path: '/visual_style/typography',
        title: 'Typography',
        content: pageLoader(() => import('./visual_style/typography.md')),
      },
      {
        path: '/visual_style/spacing',
        title: 'Spacing',
        content: pageLoader(() => import('./visual_style/spacing.md'))
      },
      {
        path: '/visual_style/iconography',
        title: 'Iconography',
        content: pageLoader(() => import('./visual_style/iconography.md')),
        imports: {}
      },
      {
        path: '/visual_style/logo',
        title: 'Logo',
        content: pageLoader(() => import('./visual_style/logo.md'))
      }
    ]
  },
  {
    title: 'Components',
    pages: [
      {
        path: '/components',
        title: 'Getting Started',
        content: pageLoader(() => import('../../components/README.md'))
      }
    ]
  },
  {
    title: 'Tokens',
    path: '/tokens',
    content: pageLoader(() => import('./tokens/tokens.md'))
  },
  {
    title: 'Designers Guide',
    pages: [
      {
        path: '/guides/gettingstarted',
        title: 'Getting Started',
        content: pageLoader(() => import('./guides/gettingstarted.md'))
      },
      {
        path: '/guides/componentdocumentation',
        title: 'Writing Component Documentation',
        content: pageLoader(() => import('./guides/componentdocumentation.md'))
      }
    ]
  },
  {
    title: 'Developers Guide',
    pages: [
      {
        path: '/guides/quickstart',
        title: 'Quick start',
        content: pageLoader(() => import('./guides/quickstart.md'))
      },
      {
        path: '/guides/setup',
        title: 'Set up',
        content: pageLoader(() => import('./guides/setup.md'))
      },
      {
        path: '/guides/scripts',
        title: 'Package Scripts',
        content: pageLoader(() => import('./guides/scripts.md'))
      },
      {
        path: '/guides/deploying',
        title: 'Deploying to the web',
        content: pageLoader(() => import('./guides/deploying.md'))
      },
      {
        path: '/guides/packages',
        title: 'npm packages',
        content: pageLoader(() => import('./guides/packages.md'))
      },
      {
        path: '/guides/configuration',
        title: 'Configuration',
        content: pageLoader(() => import('./guides/configuration.md'))
      },
      {
        path: '/guides/publishing',
        title: 'Publishing packages to npm',
        content: pageLoader(() => import('./guides/publishing.md'))
      },
    ],
  },
  {
    title: 'Reading list',
    path: '/reading_list',
    content: pageLoader(() => import('./reading_list.md'))
  }
];
