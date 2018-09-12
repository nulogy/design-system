import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import { loadIBMPlexFont, fontMixins } from "./typography"


injectGlobal`
${ styledNormalize }
${ loadIBMPlexFont }

body {
  ${ fontMixins["font-family--regular", "line-height--regular"] }
}

h1, h2, h3, h4 {
	${ fontMixins["font-weight--medium"]
}
`
