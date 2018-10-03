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
        content: pageLoader(() => import('./visual_style/iconography.md')),
        imports: {
          Icon: require('@nulogy/components').Icons.Icon
        }        
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
        title: 'Introduction',
        content: pageLoader(() => import('../../components/README.md'))
      },
      {
        path: '/components/button',
        title: 'Buttons',
        content: pageLoader(() => import('./components/buttons.md')),
        imports: {
          ApprovalButton: require('@nulogy/components').ApprovalButton,
          Button: require('@nulogy/components').Button,
          DangerButton: require('@nulogy/components').DangerButton,
          QuietButton: require('@nulogy/components').QuietButton,
          LinkButton: require('@nulogy/components').LinkButton
        }
      }, {
        path: '/components.data_list',
        title: 'Data List',
        content: pageLoader(() => import('./components/data_list.md')),
        imports: {
          DataList: require('@nulogy/components').DataList.DataList
        }
      }, {
        path: '/components/icons',
        title: 'Icons',
        content: pageLoader(() => import('./components/icons.md')),
        imports: {
          Icon: require('@nulogy/components').Icons.Icon
        }
      }, {
        path: '/components/links',
        title: 'Links',
        content: pageLoader(() => import('./components/links.md')),
        imports: {
          Link: require('@nulogy/components').Link
        }
      }, {
        path: '/components/tables',
        title: 'Table',
        content: pageLoader(() => import('./components/tables.md')),
        imports: {
          Table: require('@nulogy/components').Tables.Table,
          Header: require('@nulogy/components').Tables.Header,
          Body: require('@nulogy/components').Tables.Body,
          Row: require('@nulogy/components').Tables.Row,
          Cell: require('@nulogy/components').Tables.Cell,
          ActionCell: require('@nulogy/components').Tables.ActionCell,
          HeaderCell: require('@nulogy/components').Tables.HeaderCell,
          Button: require('@nulogy/components').Tables.Button,
          CreateRow: require('@nulogy/components').Tables.CreateRow,
          TextInput: require('@nulogy/components').Tables.TemporaryTextInput,
        }
      }, {
        path: '/components/type',
        title: 'Type',
        content: pageLoader(() => import('./components/type.md')),
        imports: {
          Title: require('@nulogy/components').Type.Title,
          SectionTitle: require('@nulogy/components').Type.SectionTitle,
          SubsectionTitle: require('@nulogy/components').Type.SubsectionTitle,
          P: require('@nulogy/components').Type.P,
          Text: require('@nulogy/components').Type.Text
        }
      }, 
    ]
  },
  {
    title: 'Tokens',
    path: '/tokens',
    imports: colourImports,
    content: pageLoader(() => import('./tokens/tokens.md'))
  },
  {
    title: 'Guides',
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
        path: '/guides/publishing',
        title: 'Publishing packages to npm',
        content: pageLoader(() => import('./guides/publishing.md'))
      },
    ]
  },
  {
    title: 'Reading list',
    path: '/reading_list',
    content: pageLoader(() => import('./reading_list.md'))
  }
];
