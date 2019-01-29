import styled from "styled-components";
import PropTypes from "prop-types";
import { color, space } from "styled-system";
import theme from "../theme";
import { subPx } from "../utils";

const stateStyle = props => {
  if (props.disabled) {
    return ([
      theme.colors.lightGrey,
      theme.colors.lightGrey,
    ]);
  } else if (props.error) {
    return ([
      theme.colors.red,
      theme.colors.red,
    ]);
  } else {
    return ([
      theme.colors.black,
      theme.colors.grey,
    ]);
  }
};

const Input = styled.input`
    width: 100%
    color: ${props => stateStyle(props)[0]}; 
    border: 1px solid;
    border-color: ${props => stateStyle(props)[1]}; 
    border-radius: ${theme.radii[1]};
    padding: ${subPx(theme.space[2])};
    font-size: ${theme.fontSizes[1]};
    font-family: ${theme.fonts.base};
    line-height: ${theme.lineHeights.base};
    ${space}
    ${color}

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
  ...color.PropTypes,
  ...space.PropTypes,
};

Input.defaultProps = {
  disabled: false,
  error: false,
  mb: 2,
};

export default Input;
