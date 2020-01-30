import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily } from "styled-system";
import propTypes from "@styled-system/prop-types";
import theme from "../theme";

const getAttrs = inline => (inline ? { as: "span" } : null);

const Text = styled.p.attrs(props => getAttrs(props.inline))(
  space,
  fontSize,
  fontWeight,
  lineHeight,
  color,
  fontFamily,
  textAlign,
  ({ disabled }) => ({
    opacity: disabled ? "0.3333" : null
  })
);

Text.propTypes = {
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.fontSize,
  ...propTypes.fontWeight,
  ...propTypes.lineHeight,
  ...propTypes.color,
  ...propTypes.fontFamily,
  ...propTypes.textAlign
};

Text.defaultProps = {
  inline: false,
  disabled: false,
  m: 0,
  fontSize: theme.fontSizes.medium,
  lineHeight: theme.lineHeights.base,
  color: "currentColor"
};

export default Text;
