import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isBefore } from "date-fns/esm";
import { MonthPicker } from "../MonthPicker";
import { Text } from "../Type";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { InlineValidation } from "../Validation";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { FieldLabel } from "../FieldLabel";

const MonthRange = ({
  onRangeChange,
  onStartDateChange,
  onEndDateChange,
  errorMessage,
  startDateErrorMessage,
  endDateErrorMessage,
  defaultStartDate,
  defaultEndDate,
  endDateInputProps,
  startDateInputProps,
  disableRangeValidation,
  labelProps
}) => {
  const [startMonth, setStartMonth] = useState(defaultStartDate);
  const [endMonth, setEndMonth] = useState(defaultEndDate);
  const [rangeError, setRangeError] = useState();

  const changeStartDateHandler = date => {
    setStartMonth(date);
    if (onStartDateChange) {
      onStartDateChange(date);
    }
  };
  const changeEndDateHandler = date => {
    setEndMonth(date);
    if (onEndDateChange) {
      onEndDateChange(date);
    }
  };

  const validateDateRange = () => {
    let error;
    if (endMonth && startMonth && isBefore(endMonth, startMonth)) {
      error = "End date is before start Month";
    }
    setRangeError(error);
    if (onRangeChange) {
      onRangeChange({
        startDate: startMonth,
        endDate: endMonth,
        error
      });
    }
  };

  useEffect(() => {
    validateDateRange();
  }, [startMonth, endMonth]);

  return (
    <>
      <FieldLabel labelText="Month Range" {...labelProps}>
        <Box
          display="inline-flex"
          justifyContent="center"
          alignItems="flex-start"
          mb={rangeError || errorMessage ? "x1" : "x3"}
        >
          <MonthPicker
            selected={startMonth}
            onChange={changeStartDateHandler}
            inputProps={startDateInputProps}
            errorMessage={startDateErrorMessage}
          />
          <Flex px="x2" alignItems="center" maxHeight="38px">
            <Text>-</Text>
          </Flex>
          <MonthPicker
            selected={endMonth}
            onChange={changeEndDateHandler}
            inputProps={endDateInputProps}
            errorMessage={endDateErrorMessage}
          />
        </Box>
      </FieldLabel>
      {!disableRangeValidation && <InlineValidation errorMessage={rangeError} />}
      <InlineValidation errorMessage={errorMessage} />
    </>
  );
};

MonthRange.propTypes = {
  onRangeChange: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  endDateErrorMessage: PropTypes.string,
  startDateErrorMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  defaultStartDate: PropTypes.instanceOf(Date),
  defaultEndDate: PropTypes.instanceOf(Date),
  endDateInputProps: PropTypes.shape(InputFieldPropTypes),
  startDateInputProps: PropTypes.shape(InputFieldPropTypes),
  disableRangeValidation: PropTypes.bool,
  labelProps: PropTypes.shape({})
};

MonthRange.defaultProps = {
  onRangeChange: null,
  onStartDateChange: null,
  onEndDateChange: null,
  endDateErrorMessage: null,
  startDateErrorMessage: null,
  errorMessage: null,
  defaultStartDate: null,
  defaultEndDate: null,
  endDateInputProps: InputFieldDefaultProps,
  startDateInputProps: InputFieldDefaultProps,
  disableRangeValidation: false,
  labelProps: null
};

export default MonthRange;
