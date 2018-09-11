import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import { loadIBMPlexFont, fontMixins } from "./typography"

injectGlobal`
${ styledNormalize }
${ loadIBMPlexFont }

body {
  ${ fontMixins["font-family--regular"] }
}
`