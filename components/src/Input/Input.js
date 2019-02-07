import styled from "styled-components";
import PropTypes from "prop-types";
import { space } from "styled-system";
import theme from "../theme";
import { subPx } from "../utils";

const inputStyles = {
  disabled: {
    color: theme.colors.lightGrey,
    borderColor: theme.colors.lightGrey,
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

const getColor = props => getInputStyle(props).color;
const getBorderColor = props => getInputStyle(props).borderColor;

const Input = styled.input`
    width: 100%
    color: ${getColor}; 
    border: 1px solid;
    border-color: ${getBorderColor}; 
    border-radius: ${theme.radii[1]};
    border-radius: ${theme.radii.medium};
    padding: ${subPx(theme.space[2])};
    font-size: ${theme.fontSizes[1]};
    font-family: ${theme.fonts.base};
    line-height: ${theme.lineHeights.base};
    ${space}

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
