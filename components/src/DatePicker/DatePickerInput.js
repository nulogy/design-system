import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../theme";
import { Input, Icon } from "..";

const StyledDateInputIcon = styled(Icon)({
  position: "absolute",
  right: "8px",
  color: theme.colors.darkGrey,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none"
});

const DatePickerInput = forwardRef(({ onClick, onChange, onInputChange, value }, ref) => {
  const handleChange = e => {
    onInputChange(e);
    onChange(e);
  };

  return (
    <div ref={ref}>
      <Input value={value} onClick={onClick} onChange={handleChange} label="a label" />
      <StyledDateInputIcon icon="calendarToday" size={theme.space.x2} />
    </div>
  );
});

DatePickerInput.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired
};

DatePickerInput.defaultProps = {
  onClick: undefined,
  onChange: undefined,
  value: undefined
};

export default DatePickerInput;
