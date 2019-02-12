import PropTypes from "prop-types";
import styled from "styled-components";
import {
  color, space, fontSize, fontWeight, lineHeight, textAlign, fontFamily,
} from "styled-system";
import theme from "../theme";

const Text = styled.p([],( props )=>({
  ...space(props),
  ...fontSize(props),
  ...fontWeight(props),
  ...lineHeight(props),
  ...color(props),
  ...fontFamily(props),
  ...textAlign(props),
  display: props.display,
  opacity: (props.disabled ? "0.5" : null),
  }));

Text.defaultProps = {
  m: 0,
  fontSize: 1,
  lineHeight: theme.lineHeights.base,
  color: "currentColor",
  display: "block",
};

export default Text;
