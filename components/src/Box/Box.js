import styled from "styled-components";
import {
  color, space, width, maxWidth, boxShadow, borderRadius, textAlign, order
} from "styled-system";
import theme from "../theme";

const Box = styled.div`
 ${color}
 ${space}
 ${width}
 ${maxWidth}
 ${borderRadius}
 ${boxShadow}
 ${textAlign}
 ${order}
`;

Box.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...maxWidth.propTypes,
  ...borderRadius.propTypes,
  ...boxShadow.propTypes,
  ...textAlign.propTypes,
  ...order.propTypes,
};

Box.defaultProps = {
  theme,
};

export default Box;
