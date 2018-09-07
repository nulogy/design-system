import {css, injectGlobal} from 'styled-components';

injectGlobal`
/* 1. this style is created by importing this module */
.nds--externalInjected {
  color: green;
}
`;

// 3. this mixin just returns props
export const mixin = css`color: red;`

// 4. this returns an entire css string 
export default css`
.nds--external {
  color: orange;
}
`