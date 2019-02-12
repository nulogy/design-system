import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";
import Text from "../Type/Text";

const styles = {
  checked: {
    disabled: {
      borderColor: theme.colors.lightGrey,
      backgroundColor: theme.colors.lightGrey,
    },
    default: {
      borderColor: theme.colors.darkBlue,
      backgroundColor: theme.colors.darkBlue,
    },
  },
  unchecked: {
    disabled: {
      borderColor: theme.colors.lightGrey,
      backgroundColor: theme.colors.whiteGrey,
    },
    default: {
      borderColor: theme.colors.grey,
      backgroundColor: theme.colors.white,
    },
  },
};

const getStyles = ({ disabled, checked }) => (
  styles[checked ? "checked" : "unchecked"][disabled ? "disabled" : "default"]
);

const getBorderColor = props => getStyles(props).borderColor;
const getBackgroundColor = props => getStyles(props).backgroundColor;

const VisualCheckbox = styled.div`
  min-width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: 2px;
  border: solid 1px ${props => getBorderColor(props)};
  background-color: ${props => getBackgroundColor(props)};
  position: relative;
  top: 4px;
  &:before{
    content: "";
    display: none;
    position: relative;
    left: 4px;
    width: 3px;
    height: 9px;
    border: solid white;
    border-width: 0 3px 3px 0;
    border-radius: 1px;
    transform: rotate(45deg);
  }
`;

const CheckboxWrapper = styled.label`
  cursor: ${props => (props.disabled ? null : "pointer")};
  display: inline-flex;
  width: auto;
  vertical-align: top;
  align-items: flex-start;
  user-select: none;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 1px;
  width: 1px;
  &:focus + ${VisualCheckbox} {
    box-shadow: 0 0 6px ${theme.colors.blue};
  }
  &:checked + ${VisualCheckbox} {
    background-color: ${props => getBackgroundColor(props)};
    border-color: ${props => getBorderColor(props)};
  }
  &:checked + ${VisualCheckbox}:before {
    display: block;
  }
`;

const BaseCheckbox = props => {
  const {
    className,
    labelText,
    disabled,
    checked,
  } = props;
  return (
    <Box className={ className }>
      <CheckboxWrapper disabled={ disabled }>
        <CheckboxInput type="checkbox" { ...props } />
        <VisualCheckbox disabled={ disabled } checked={ checked } />
        <Text disabled={ disabled } mb={ 0 }> {labelText} </Text>
      </CheckboxWrapper>
    </Box>
  );
};

BaseCheckbox.propTypes = {
  labelText: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

BaseCheckbox.defaultProps = {
  labelText: null,
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  className: null,
};

const Checkbox = styled(BaseCheckbox)`
  padding: 8px 0;
`;

export default Checkbox;
