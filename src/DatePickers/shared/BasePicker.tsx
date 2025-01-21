import React, { forwardRef, useState, useEffect } from "react";
import propTypes from "@styled-system/prop-types";
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { Field } from "../../Form";
import { InputFieldDefaultProps } from "../../Input/InputField";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../../locales.const";
import { useComponentVariant } from "../../NDSProvider/ComponentVariantContext";
import { useLocale } from "../../NDSProvider/LocaleContext";
import { registerDatePickerLocales } from "../../utils/datePickerLocales";
import { getSubset } from "../../utils/subset";
import { InlineValidation } from "../../Validation";
import { DatePickerStyles } from "./styles";
import { BaseDatePickerProps } from "./types";
import DatePickerInput from "../components/DatePickerInput";

interface BasePickerProps extends BaseDatePickerProps {
  defaultFormat: string;
  disabledKeyboardNavigation?: boolean;
  defaultPlaceholder: string;
  showMonthYearPicker?: boolean;
  renderHeader: (props: ReactDatePickerCustomHeaderProps) => JSX.Element;
  onUpKeyPress?: () => void;
  onDownKeyPress?: () => void;
}

export const BasePicker = forwardRef<unknown, BasePickerProps>(
  (
    {
      dateFormat,
      errorMessage,
      errorList,
      inputProps,
      minDate,
      maxDate,
      disableFlipping,
      className,
      onInputChange,
      onChange,
      onBlur,
      onFocus,
      selected,
      defaultFormat,
      defaultPlaceholder,
      showMonthYearPicker,
      renderHeader,
      onUpKeyPress,
      onDownKeyPress,
      locale,
      disabledKeyboardNavigation,
      ...props
    },
    pickerRef
  ) => {
    const [selectedDate, setSelectedDate] = useState(selected);
    const { locale: contextLocale } = useLocale();
    const [ref, setRef] = useState(null);
    const componentVariant = useComponentVariant();

    useEffect(() => {
      registerDatePickerLocales();
    }, []);

    useEffect(() => {
      setSelectedDate(selected);
    }, [selected]);

    const onRefChange = React.useCallback((node) => {
      if (node) {
        setRef(node);
      }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onInputChange) {
        onInputChange(event.target.value);
      }
    };

    const handleSelectedDateChange = (date: Date) => {
      if (onChange) {
        onChange(date);
      }
      setSelectedDate(date);
    };

    const handleEnterKey = () => {
      if (ref) {
        const isOpen = ref.isCalendarOpen();
        ref.setOpen(!isOpen);
      }
    };

    const customInputProps = {
      ...InputFieldDefaultProps,
      inputWidth: componentVariant === "touch" ? "280px" : "184px",
      error: !!(errorMessage || errorList),
      ...inputProps,
      placeholder: (inputProps && inputProps.placeholder) || defaultPlaceholder,
    };

    const customInput = (
      <DatePickerInput
        variant={componentVariant}
        inputProps={customInputProps}
        dateFormat={dateFormat || defaultFormat}
        onInputChange={handleInputChange}
        onUpKeyPress={onUpKeyPress}
        onDownKeyPress={onDownKeyPress}
        onEnterKeyPress={handleEnterKey}
      />
    );

    const spaceProps = getSubset(props, propTypes.space);

    return (
      <Field className={`${className} nds-date-picker`} {...spaceProps}>
        <DatePickerStyles />
        <ReactDatePicker
          selected={selectedDate}
          openToDate={selectedDate}
          dateFormat={dateFormat || defaultFormat}
          onChange={handleSelectedDateChange}
          customInput={customInput}
          renderCustomHeader={renderHeader}
          strictParsing
          minDate={minDate}
          maxDate={maxDate}
          locale={NDS_TO_DATE_FN_LOCALES_MAP[locale || contextLocale]}
          ref={(r) => {
            if (pickerRef) {
              pickerRef["current"] = r;
            }
            onRefChange(r);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          showMonthYearPicker={showMonthYearPicker}
          popperModifiers={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            flip: { enabled: !disableFlipping },
          }}
          disabledKeyboardNavigation={disabledKeyboardNavigation}
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
);
