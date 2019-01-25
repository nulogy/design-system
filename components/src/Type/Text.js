import PropTypes from "prop-types";
import styled from "styled-components";
import {
  color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily,
} from "styled-system";
import theme from "../theme";

const Text = styled.p`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
  ${fontFamily}
  ${textAlign}
  -webkit-font-smoothing: antialiased;
  display: ${props => props.display}
`;
Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes,
  ...fontFamily.propTypes,
  ...textAlign.propTypes,
  display: PropTypes.string,
};

Text.defaultProps = {
  m: 0,
  fontSize: 1,
  lineHeight: theme.lineHeights.base,
  mb: 4,
  color: "black",
  display: "block",
};

export default Text;
