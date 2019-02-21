import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import theme from "../theme";
import { subPx } from "../Utils";

const inputStyles = {
  disabled: {
    color: transparentize(0.6667, theme.colors.black),
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.whiteGrey,
  },
  error: {
    color: theme.colors.red,
    borderColor: theme.colors.red,
  },
  default: {
    color: theme.colors.black,
    borderColor: theme.colors.grey,
  },
};

const getInputStyle = props => {
  if (props.disabled) { return inputStyles.disabled; }
  if (props.error) { return inputStyles.error; }

  return inputStyles.default;
};

const Input = styled.input.attrs(({ error, required }) => ({
  "aria-invalid": error,
  "aria-required": required,
  "required": required,
}))(
  space,
  {
    width: "100%",
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space[2]),
    fontSize: theme.fontSizes[1],
    fontFamily: theme.fonts.base,
    lineHeight: theme.lineHeights.base,
    "&:focus": {
      outline: "none",
      color: theme.colors.black,
      borderColor: theme.colors.blue,
      boxShadow: `0 0 3px ${theme.colors.blue}`,
    },
<<<<<<< HEAD
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black),
    },
=======
>>>>>>> ddfd629c407fb673f46a416421cd98312a2a5415
  },
  props => (getInputStyle(props))
);

Input.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  required: PropTypes.bool,
  ...space.PropTypes,
};

Input.defaultProps = {
  disabled: false,
  error: false,
  required: false,
};

export default Input;
