export const borderRadius ='3px';

export const font = {
  family: {
    regular: "'IBM Plex Sans', sans",
    mono: "'IBM Plex Mono', monospace"
  },
  size: {
    smaller: 12,
    small: 14,
    medium: 16,
    large: 20,
    larger: 24,
    largest: 28,
    get pageTitle() {return this.largest},
    get sectionTitle() {return this.larger},
    get subsectionTitle() {return this.large}
  },
  weight: {
    normal: 400,
    medium: 500,
    bold: 700
  },
  lineHeight: {
    regular: 1.5
  }
};

export const space = {
  half: '4px',
  x1: '8px',
  x2: '16px',
  x3: '24px',
  x4: '32px',
  x6: '48px',
  x8: '64px'
};

export const colour = {
  get base() {return colour.blue['600']},
  get success() {return colour.green['600']},
  get warning() {return colour.yellow['600']},
  get error() {return colour.red['600']},
  get white() {return this.neutral['100']},
  get black() {return this.neutral['900']},
  neutral: {
    100: '#FFFFFF',
    x200: '#F7F7F7',
    x300: '#EBEBEB',
    x400: '#C7CED4',
    x500: '#98A9B8',
    x600: '#607180',
    x700: '#475866',
    x800: '#203140',
    900: '#03101A'
  },
  blue: {
    get base() {return this['600']},
    x200: '#F0F3F5',
    x300: '#DDE8ED',
    x400: '#C2E0F0',
    x500: '#63B5E8',
    600: '#0E77D2',
    x700: '#054CA3',
    x800: '#1B2B4D',
  },
  yellow: {
    get base() {return this['600']},
    x200: '#F5F3F0',
    x300: '#F2EADA',
    x400: '#FAE5AF',
    x500: '#FCDA7B',
    600: '#FDCF00',
    x700: '#CEA10C',
    x800: '#B3751E'
  },
  green: {
    get base() {return this['600']},
    x200: '#EBF5F3',
    x300: '#C1E8E0',
    x400: '#8DD6C8',
    x500: '#10B297',
    600: '#008763',
    x700: '#02613C',
    x800: '#053A1F'
  },
  red: {
    get base() {return this['600']},
    x200: '#F7EEED',
    x300: '#F2CECB',
    x400: '#F2B2AE',
    x500: '#DB807D',
    600: '#D13D3D',
    x700: '#9E131A',
    x800: '#78060F'
  }
};

export const corner = {
  small: '2px',
  medium: '4px',
  large: '8px'
};

export const shadow = {
  pressed: '0 .033em .25em rgba(3,16,26,0.175);',//needs better naming
  close: '0 .125em .75em rgba(3,16,26,0.175);',
  middle: '4px',
  far: '8px'
};

export default {
  borderRadius: borderRadius,
  colour: colour,
  font: font,
  space: space,
  space: corner,
};
