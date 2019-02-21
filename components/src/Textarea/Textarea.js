import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import theme from "../theme";
import { subPx } from "../Utils";

const TextareaStyles = {
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

const getTextareaStyle = props => {
  if (props.disabled) { return TextareaStyles.disabled; }
  if (props.error) { return TextareaStyles.error; }
  return TextareaStyles.default;
};

const Textarea = styled.textarea.attrs(({ error, required, placeholder }) => ({
  "aria-invalid": error,
  "aria-required": required,
  "required": required,
  "placeholder": placeholder,
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
    minHeight: "40px",
    minWidth: "20em",
    "&:focus": {
      outline: "none",
      color: theme.colors.black,
      borderColor: theme.colors.blue,
      boxShadow: `0 0 3px ${theme.colors.blue}`,
    },
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black),
    },
  },
  props => (getTextAreaStyle(props))
);

Textarea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  ...space.PropTypes,
};

Textarea.defaultProps = {
  disabled: false,
  error: false,
  required: false,
  rows: 3,
  placeholder: undefined,
};

export default Textarea;