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
}))`
    width: 100%
    border: 1px solid;
    border-radius: ${theme.radii.medium};
    padding: ${subPx(theme.space[2])};
    font-size: ${theme.fontSizes[1]};
    font-family: ${theme.fonts.base};
    line-height: ${theme.lineHeights.base};
    min-height: 40px;
    min-width: 20em;
    ${space}
    ${props => getTextareaStyle(props)}
    &:focus {
        outline: none;
        color: ${theme.colors.black}
        border-color: ${theme.colors.blue};
        box-shadow: 0 0 3px ${theme.colors.blue};
    }
    ::placeholder{
      color: ${transparentize(0.4, theme.colors.black)};
    }
`;

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
  rows: "3",
  placeholder: false,
};

export default Textarea;
