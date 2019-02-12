import PropTypes from "prop-types";
import styled from "styled-components";
import {
  color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily,
} from "styled-system";
import theme from "../theme";

const getAttrs = inline => (
  inline
    ? ({ as: "span" })
    : null
);

const Text = styled.p.attrs(props => (getAttrs(props.inline)))([], props => ({
  ...space(props),
  ...fontSize(props),
  ...fontWeight(props),
  ...lineHeight(props),
  ...color(props),
  ...fontFamily(props),
  ...textAlign(props),
  opacity: (props.disabled ? "0.5" : null),
}));

Text.propTypes = {
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  ...space.PropTypes,
  ...fontSize.PropTypes,
  ...fontWeight.PropTypes,
  ...lineHeight.PropTypes,
  ...color.PropTypes,
  ...fontFamily.PropTypes,
  ...textAlign.PropTypes,
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
