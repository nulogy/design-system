import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import theme from "../theme";
import { subPx } from "../utils";

const inputStyles = {
  disabled: {
    textColor: transparentize(0.6667, theme.colors.black),
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.whiteGrey,
  },
  error: {
    textColor: theme.colors.red,
    borderColor: theme.colors.red,
  },
  default: {
    textColor: theme.colors.black,
    borderColor: theme.colors.grey,
  },
};

const getInputStyle = props => {
  if (props.disabled) { return inputStyles.disabled; }
  if (props.error) { return inputStyles.error; }

  return inputStyles.default;
};

const getTextColor = props => getInputStyle(props).textColor;
const getBorderColor = props => getInputStyle(props).borderColor;
const getBackgroundColor = props => getInputStyle(props).backgroundColor;

const Input = styled.input.attrs(({ error }) => ({
  "aria-invalid": error,
}))`
    width: 100%
    border: 1px solid;
    border-radius: ${theme.radii.medium};
    padding: ${subPx(theme.space[2])};
    font-size: ${theme.fontSizes[1]};
    font-family: ${theme.fonts.base};
    line-height: ${theme.lineHeights.base};
    ${space}
    ${props => getInputStyle(props)}

    &:focus {
        outline: none;
        color: ${theme.colors.black}
        border-color: ${theme.colors.blue};
        box-shadow: 0 0 3px ${theme.colors.blue};
    }
`;

Input.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  ...space.PropTypes,
};

Input.defaultProps = {
  disabled: false,
  error: false,
};

export default Input;
