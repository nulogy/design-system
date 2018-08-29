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
    smaller: 1,
    regular: 1.5
  }
};

export const space = {
  half: 4,
  x1: 8,
  x2: 16,
  x3: 24,
  x4: 32,
  x6: 48,
  x8: 64
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
    200: '#F7F7F7',
    300: '#EBEBEB',
    400: '#C7CED4',
    500: '#98A9B8',
    600: '#607180',
    700: '#475866',
    800: '#203140',
    900: '#03101A'
  },
  blue: {
    get base() {return this['600']},
    200: '#F0F3F5',
    300: '#DDE8ED',
    400: '#C2E0F0',
    500: '#63B5E8',
    600: '#0E77D2',
    700: '#054CA3',
    800: '#1B2B4D',
  },
  yellow: {
    get base() {return this['600']},
    200: '#F5F3F0',
    300: '#F2EADA',
    400: '#FAE5AF',
    500: '#FCDA7B',
    600: '#FDCF00',
    700: '#CEA10C',
    800: '#B3751E'
  },
  green: {
    get base() {return this['600']},
    200: '#EBF5F3',
    300: '#C1E8E0',
    400: '#8DD6C8',
    500: '#10B297',
    600: '#008763',
    700: '#02613C',
    800: '#053A1F'
  },
  red: {
    get base() {return this['600']},
    200: '#F7EEED',
    300: '#F2CECB',
    400: '#F2B2AE',
    500: '#DB807D',
    600: '#D13D3D',
    700: '#9E131A',
    800: '#78060F'
  }
};

export const radius = {
  small: 2,
  medium: 4,
  large: 6
};

export const shadow = {
  pressed: '0 1px 4px 0 rgba(3,16,26, 0.175);',
  close: '0 2px 12px 0 rgba(3,16,26, 0.2);',
  middle: '0 3px 12px 0 rgba(3,16,26, 0.25);',
  far: '0 6px 15px 0 rgba(3,16,26, 0.33);'


};

export default {
  borderRadius: borderRadius,
  colour: colour,
  font: font,
  space: space,
  radius: radius,
};
