import PropTypes from "prop-types";
import styled from "styled-components";
import {
  color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily,
} from "styled-system";
import theme from "../theme";

const Text = styled.p.attrs(props => ({
  as: `${props.inline ? "span" : "p"}`,
}))([], props => ({
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
  color: "currentColor",
};

export default Text;
