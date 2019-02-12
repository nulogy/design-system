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
  opacity: ${props => (props.disabled ? "0.3333" : null)}
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
  inline: false,
  disabled: false,
  m: 0,
  fontSize: 1,
  lineHeight: theme.lineHeights.base,
  color: "currentColor",
};

export default Text;
