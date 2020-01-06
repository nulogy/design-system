import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isBefore } from "date-fns";
import { DatePicker } from "../DatePicker";
import { Text } from "../Type";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { InlineValidation } from "../Validation";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { FieldLabel } from "../FieldLabel";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";

const DateRange = ({
  dateFormat,
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
  labelProps,
  minDate,
  maxDate
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
      <FieldLabel {...labelProps}>
        <Box
          display="inline-flex"
          justifyContent="center"
          alignItems="flex-start"
          mb={rangeError || errorMessage ? "x1" : "x3"}
        >
          <DatePicker
            dateFormat={dateFormat}
            selected={startMonth}
            onChange={changeStartDateHandler}
            inputProps={startDateInputProps}
            errorMessage={startDateErrorMessage}
            minDate={minDate}
            maxDate={maxDate}
          />
          <Flex px="x2" alignItems="center" maxHeight="38px">
            <Text>-</Text>
          </Flex>
          <DatePicker
            dateFormat={dateFormat}
            selected={endMonth}
            onChange={changeEndDateHandler}
            inputProps={endDateInputProps}
            errorMessage={endDateErrorMessage}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Box>
      </FieldLabel>
      {!disableRangeValidation && <InlineValidation errorMessage={rangeError} />}
      <InlineValidation errorMessage={errorMessage} />
    </>
  );
};

DateRange.propTypes = {
  dateFormat: PropTypes.string,
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
  labelProps: PropTypes.shape(FieldLabelProps),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date)
};

DateRange.defaultProps = {
  dateFormat: undefined,
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
  labelProps: {
    ...FieldLabelDefaultProps,
    labelText: "Month Range"
  },
  minDate: null,
  maxDate: null
};

export default DateRange;
