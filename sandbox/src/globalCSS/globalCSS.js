import {injectGlobal, css} from 'styled-components';
import { font } from '@nulogy/tokens';
// 1. you don't see it, but the .externalInjected class was created just by importing @nulogy/styles
import external, { mixin } from "./external"

injectGlobal`
.nds {
  /* 2. this is your bread and butter pre-processed css */
  &--global {
    color: pink;
    font-size: ${font.size.larger}px;
  }

  &--mixin {
    /* 3. */
    ${mixin}
  }
}

/* 4. */
${external}
`

// 5. here is an example of defining mixins and dynamically creating utility classes from them in a loop
const mx = {
  lineHeight: css`line-height: 1.5`,
  noMargin: css`margin: 0;`,
  fontFamily: css`font-family: ${font.family.regular};`,
  fontFamilyMono: css`font-family: ${font.family.mono};`,
}
// create global utility classes from those mixins
Object.entries(mx)
  .forEach(([className, rule]) => injectGlobal`.${className} { ${rule} }`);