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
  display: ${props => props.display}
  opacity: ${props => props.disabled ? "0.5" : null}
`;
Text.propTypes = {
  display: PropTypes.string,
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes,
  ...fontFamily.propTypes,
  ...textAlign.propTypes,
};

Text.defaultProps = {
  m: 0,
  fontSize: 1,
  lineHeight: theme.lineHeights.base,
  mb: 4,
  color: "currentColor",
  display: "block",
};

export default Text;
