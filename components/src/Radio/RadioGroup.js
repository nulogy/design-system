import React from "react";
import Radio from "./Radio";
import PropTypes from "prop-types";

const getCheckedValue = (value, checkedValue) => {
  if (checkedValue === undefined){ return undefined };
  if (value === checkedValue){ return true };
  return false;
}

const getRadioButtons = props => {
  const radioButtons = React.Children.map(props.children, radio => {
    const {
      children,
      value,
      disabled,
      ...radioProps
    } = radio.props
    console.log(value + " | " + props.checkedValue)
    return(
      <Radio
        {...radioProps}
        disabled = {props.disabled || disabled}
        name = {props.name}
        value = {value}
        defaultChecked={ value === props.defaultValue ? true : undefined}
        checked={ getCheckedValue(value, props.checkedValue)}
        onChange={ props.onChange }
      />
    )
  });
  return (radioButtons)
}

const RadioGroup = props =>{
  return(
    <div>
      { getRadioButtons(props) }
    </div>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([Radio]),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([Radio]),
      })
    ),
  ]).isRequired,
  defaultValue: PropTypes.string,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  defaultValue: undefined,
  checkedValue: undefined,
  onChange: undefined,
};

export default RadioGroup;