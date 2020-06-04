import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import propTypes from "@styled-system/prop-types";

const getAttrs = inline => (inline ? { as: "span" } : null);

const Text = styled.p.attrs(props => getAttrs(props.inline))(space, typography, color, ({ disabled }) => ({
  opacity: disabled ? "0.3333" : null
}));

Text.propTypes = {
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.typography
};

Text.defaultProps = {
  inline: false,
  disabled: false,
  mt: 0,
  mb: 0,
  fontSize: "medium",
  lineHeight: "base",
  color: "currentColor"
};

export default Text;
