import React, { useState, useEffect } from "react";
import { storiesOf } from "@storybook/react";
import { isBefore } from "date-fns/esm";
import { MonthPicker } from ".";
import { Text, Button, Flex, Box } from "../index";
import { InlineValidation } from "../Validation";

const MonthRangePicker = () => {
  const [startMonth, setStartMonth] = useState();
  const [startMonthError, setStartMonthError] = useState();
  const [endMonth, setEndMonth] = useState();
  const [endMonthError, setEndMonthError] = useState();
  const [rangeError, setRangeError] = useState();

  const onChangeStart = date => setStartMonth(date);
  const onChangeEnd = date => setEndMonth(date);

  const validateDateRange = () => {
    let error;
    if (endMonth && startMonth && isBefore(endMonth, startMonth)) {
      error = "End date is before start Month";
    }
    setRangeError(error);
  };
  const validateEndMonth = () => {
    let error;
    if (!endMonth) {
      error = "End date is required";
    }
    setEndMonthError(error);
  };

  const validateStartMonth = () => {
    let error;
    if (!startMonth) {
      error = "Start date is required";
    }
    setStartMonthError(error);
  };

  useEffect(() => {
    validateDateRange();
  }, [startMonth, endMonth]);

  const onSubmit = () => {
    validateStartMonth();
    validateEndMonth();
  };

  return (
    <>
      <Box display="inline-flex" justifyContent="center" alignItems="flex-start" mb={rangeError ? 0 : "x3"}>
        <MonthPicker
          selected={startMonth}
          onChange={onChangeStart}
          inputProps={{ labelText: "From", required: true }}
          errorMessage={startMonthError}
        />
        <Flex p="x2" mt="25px">
          <Text>-</Text>
        </Flex>
        <MonthPicker
          selected={endMonth}
          onChange={onChangeEnd}
          inputProps={{ labelText: "To", required: true }}
          errorMessage={endMonthError}
        />
      </Box>
      <InlineValidation errorMessage={rangeError} />
      <Flex mt="x1">
        <Button onClick={onSubmit}>Submit</Button>
      </Flex>
    </>
  );
};

storiesOf("MonthPicker", module).add("range (SkipStoryshot)", () => <MonthRangePicker />);
