import { injectGlobal } from 'styled-components';
import { loadIBMPlexFont, fontMixins } from "./typography"

injectGlobal`
${ loadIBMPlexFont }

body {
  ${ fontMixins["font-family--regular"] }
}
`