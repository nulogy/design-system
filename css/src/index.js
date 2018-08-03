import {injectGlobal} from 'styled-components';
import { font } from '@nulogy/tokens';
// 1. you don't see it, but the .externalInjected class was created just by importing @nulogy/styles
import external, { mixin } from "./external"

injectGlobal`
.nds {
  &--test {
    color: pink;
    font-size: ${font.size.smallest}px;
  }

  &--mixin {
    /* 2. */
    ${mixin}
  }
}

/* 3. */
${external}
`