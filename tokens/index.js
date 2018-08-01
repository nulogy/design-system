import { Colgroup } from "../node_modules/glamorous";

const clone =  value => new value.constructor(value);
const assignDefault = (base, values) => Object.assign(clone(values[base]), values);

export const colours = {
  primary: '#1c6aa6',
  secondary: 'white',
};

export const font = {
  baseline: assignDefault('regular', {
    compact: 1.25,
    regular: 1.5,
    roomy: 2
  }),
  family: assignDefault('regular', {
    regular: '"IBM Plex Sans", sans',
    mono: '"IBM Plex Mono", monospace'
  }),
  size: assignDefault('medium', {
    smaller: 12,
    small: 14,
    medium: 16,
    large: 20,
    larger: 24,
    largest: 28,
    get pageTitle() {return this.largest},
    get sectionTitle() {return this.larger},
    get subsectionTitle() {return this.large}
  }),
  weight: assignDefault('normal', {
    normal: 400,
    bold: 500
  })
};

export const space = assignDefault('x2', {
  half: '4px',
  x1: '8px',
  x2: '16px',
  x3: '24px',
  x4: '32px',
  x6: '48px',
  x8: '64px'
});

export default {
  colours: colours,
  font: font,
  space: space,
  borderRadius: '0.4rem',
};
