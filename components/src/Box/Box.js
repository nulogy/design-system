import styled from "styled-components";
import {
  color, 
  space, 
  width, 
  minWidth, 
  maxWidth, 
  boxShadow, 
  borderRadius, 
  textAlign, 
  order, 
  height, 
  minHeight, 
  maxHeight, 
  position, 
  display,
} from "styled-system";
import theme from "../theme";

const Box = styled.div`
 ${color}
 ${space}
 ${width}
 ${minWidth}
 ${maxWidth}
 ${maxWidth}
 ${borderRadius}
 ${boxShadow}
 ${textAlign}
 ${order}
 ${height}
 ${minHeight}
 ${maxHeight}
 ${position}
 ${display}
`;

Box.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...minWidth.propTypes,
  ...maxWidth.propTypes,
  ...borderRadius.propTypes,
  ...boxShadow.propTypes,
  ...textAlign.propTypes,
  ...order.propTypes,
  ...height.propTypes,
  ...minHeight.propTypes,
  ...maxHeight.propTypes,
  ...position.propTypes,
  ...display.propTypes,
};

Box.defaultProps = {
  theme,
};

export default Box;
