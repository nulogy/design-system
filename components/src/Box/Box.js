import styled from "styled-components";
import {
  color, space, width, maxWidth, boxShadow, borderRadius, textAlign,
} from "styled-system";
import theme from "../theme.js";

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
  ...color.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...maxWidth.propTypes,
  ...borderRadius.propTypes,
  ...boxShadow.propTypes,
  ...textAlign.propTypes,
};

Box.defaultProps = {
  theme,
};

export default Box;
