export const colours = {
  primary: '#1c6aa6',
  secondary: 'white',
};

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
    bold: 500
  }
};

export default {
  colours,
  font,
  borderRadius: '0.4rem',
};
