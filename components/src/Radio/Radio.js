import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Box from "../Box/Box";

const getFill = disabled => (disabled ? theme.colors.lightGrey : theme.colors.darkBlue);

const VisualRadio = styled.div`
  width: ${theme.space[3]};
  height: ${theme.space[3]};
  margin-right: ${theme.space[2]};
  border-radius: 50%;
  box-sizing: border-box;
  border: solid 1px ${props => getFill(props.disabled)};
  background-color: ${theme.colors.white};
`;

const RadioWrapper = styled.label`
  color: ${props => (props.disabled ? theme.colors.grey : "currentColor")};
  cursor: ${props => (props.disabled ? null : "pointer")};
  display: flex;
  width: auto;
  align-items: center;
  user-select: none;
`;

const RadioInput = styled.input`
  cursor: ${props => (props.disabled ? null : "pointer")};
  position: absolute;
  opacity: 0;
  height: 1px;
  width: 1px;
  &:focus + ${VisualRadio} {
    box-shadow: 0 0 6px ${theme.colors.blue};
  }
  &:checked + ${VisualRadio} {
    border-color: ${props => getFill(props.disabled)};
    border-width: 5px;
  }
  &:not(:checked) + ${VisualRadio}{
    border-color: ${theme.colors.grey};
  }
`;

const Radio = props => {
  const {
    labelText,
    disabled,
    checked,
  } = props;
  return (
    <Box>
      <RadioWrapper disabled={ disabled }>
        <RadioInput type="radio" { ...props } />
        <VisualRadio disabled={ disabled } checked={ checked } />
        {labelText}
      </RadioWrapper>
    </Box>
  );
};

Radio.propTypes = {
  labelText: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Radio.defaultProps = {
  labelText: null,
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
};

export default Radio;


// const checkboxStyle = {
//   disabled: {
//     borderColor: theme.colors.lightGrey,
//     color: theme.colors.grey,
//   },
//   checked: {
//     borderColor: theme.colors.darkBlue,
//     borderWidth: '5px',
//   },
//   default: {
//     borderColor: theme.colors.grey,
//     borderWidth: '1px',
//   },
// };

// const getCheckboxStyle = props => {
//   if (props.disabled) { return checkboxStyle.disabled; }
//   if (props.checked) { return checkboxStyle.checked; }
//   return checkboxStyle.default;
// };

// const getBorderColor = props => getCheckboxStyle(props).borderColor;
// const getBorderWidth = props => getCheckboxStyle(props).borderWidth;
// const getColor = props => getCheckboxStyle(props).color;

// const CheckboxInput = styled(Input)`
//   position: absolute;
//   opacity: 0;
//   cursor: pointer;
//   height: 0;
//   width: 0;
//   order: 1;
// `;

// const VisualCheckbox = styled.div`
//   order: -1;
//   width: ${theme.space[3]};
//   height: ${theme.space[3]};
//   margin-right: ${theme.space[2]};
//   border-radius: 50%;
//   box-sizing: border-box;
// `;


// const BaseCheckbox = ({
//   labelText,
//   disabled,
//   checked,
//   ...props
// }) => (
//   <Label mb={theme.space[0]} {...props} >{labelText}
//     <CheckboxInput type="checkbox" />
//     <VisualCheckbox />
//   </Label>
// );


// const Checkbox = styled(BaseCheckbox)`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   user-select: none;
//   color: ${getColor};
//   ${CheckboxInput} {
//     &:checked ~ ${VisualCheckbox} {
//       border-color: ${getBorderColor};
//       border-width: ${getBorderWidth};
//     }
//   }
//   ${VisualCheckbox} {
//     border: solid 1px ${getBorderColor};
//     border-width: ${getBorderWidth};
//   }
// `;

// Checkbox.propTypes = {
//   checked: PropTypes.bool,
//   disabled: PropTypes.bool,
// };

// Checkbox.defaultProps = {
//   checked: false,
//   disabled: false,
// };

// export default Checkbox;
