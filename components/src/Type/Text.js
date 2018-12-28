// To-Do: Add small variant
import styled from 'styled-components';
import { color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily } from 'styled-system'

const Text = styled.div`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
  ${fontFamily}
  ${textAlign}
  -webkit-font-smoothing: antialiased;
`
Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes,
}

Text.defaultProps = {
  fontSize: 1,
  lineHeight: 1.5
}

export default Text
