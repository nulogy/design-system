import styled from 'styled-components';
import { color, space, width, maxWidth, boxShadow, borderRadius, textAlign } from 'styled-system'
import theme from '../theme.js'

const Box = styled.div`
 ${color}
 ${space}
 ${width}
 ${maxWidth}
 ${borderRadius}
 ${boxShadow}
 ${textAlign}
`;

Box.propTypes = {
    ...space.propTypes,
    ...width.propTypes,
    ...color.propTypes,
    ...maxWidth.propTypes,    
}

Box.defaultProps = {
  theme: theme
}
  
export default Box

