import "styled-components";
// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
    };
    fontSize: {
      [key: string]: string;
    };
    lineHeights: {
      [key: string]: string;
    };
    fontWeights: {
      [key: string]: string;
    };
    space: {
      [key: string]: string;
    };
    fonts: {
      [key: string]: string;
    };
    shadows: {
      [key: string]: string;
    };
    radii: {
      [key: string]: string;
    };
    breakpoints: {
      [key: string]: string;
    };
    borders: [];
    zIndex: {
      [key: string]: number;
    };
  }
}
