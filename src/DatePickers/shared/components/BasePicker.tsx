import React, { forwardRef, useState } from "react";
import propTypes from "@styled-system/prop-types";
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { Field } from "../../../Form";
import { InputFieldDefaultProps } from "../../../Input/InputField";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../../../locales.const";
import { useComponentVariant } from "../../../NDSProvider/ComponentVariantContext";
import { useLocale } from "../../../NDSProvider/LocaleContext";
import { registerDatePickerLocales } from "../../../utils/datePickerLocales";
import { getSubset } from "../../../utils/subset";
import { InlineValidation } from "../../../Validation";
import { DatePickerStyles } from "../styles";
import { DatePickerProps } from "../types";
import { getPopperModifiers } from "../helpers";
import DatePickerInput from "./DatePickerInput";

interface BasePickerProps extends DatePickerProps {
  name?: string;
  required?: boolean;
  defaultFormat: string;
  disabledKeyboardNavigation?: boolean;
  defaultPlaceholder: string;
  showMonthYearPicker?: boolean;
  showWeekNumbers?: boolean;
  renderHeader: (props: ReactDatePickerCustomHeaderProps) => JSX.Element;
  onUpKeyPress?: () => void;
  onDownKeyPress?: () => void;
  onEnterKeyPress?: () => void;
}

export const BasePicker = forwardRef<ReactDatePicker, BasePickerProps>(
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
      highlightDates,
      defaultFormat,
      defaultPlaceholder,
      showMonthYearPicker,
      showWeekNumbers,
      renderHeader,
      onUpKeyPress,
      onDownKeyPress,
      onEnterKeyPress,
      locale,
      disabledKeyboardNavigation,
      name,
      required,
      ...props
    },
    pickerRef
  ) => {
    const { locale: contextLocale } = useLocale();
    const [ref, setRef] = useState(null);
    const componentVariant = useComponentVariant();

    const currentLocale = locale || contextLocale;

    React.useEffect(() => {
      registerDatePickerLocales();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onInputChange) {
        onInputChange(event.target.value);
      }
    };

    const onRefChange = React.useCallback((node) => {
      if (node) {
        setRef(node);
      }
    }, []);

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
      placeholder:
        (inputProps && inputProps.placeholder) || (dateFormat === defaultFormat ? defaultPlaceholder : dateFormat),
    };

    const customInput = (
      <DatePickerInput
        locale={currentLocale}
        variant={componentVariant}
        inputProps={customInputProps}
        dateFormat={dateFormat}
        onInputChange={handleInputChange}
        onUpKeyPress={onUpKeyPress}
        onDownKeyPress={onDownKeyPress}
        onEnterKeyPress={handleEnterKey}
      />
    );

    const pickerRefHandler = (r: ReactDatePicker<string>) => {
      if (pickerRef) {
        pickerRef["current"] = r;
      }
      onRefChange(r);
    };

    const spaceProps = getSubset(props, propTypes.space);

    return (
      <Field className={`${className} nds-date-picker`} {...spaceProps}>
        <DatePickerStyles />
        <ReactDatePicker
          highlightDates={highlightDates}
          selected={selected}
          openToDate={selected}
          dateFormat={dateFormat}
          onChange={onChange}
          customInput={customInput}
          renderCustomHeader={renderHeader}
          strictParsing
          minDate={minDate}
          maxDate={maxDate}
          locale={NDS_TO_DATE_FN_LOCALES_MAP[currentLocale]}
          ref={pickerRefHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          showMonthYearPicker={showMonthYearPicker}
          showWeekNumbers={showWeekNumbers}
          name={name}
          required={required}
          onEnterKeyPress={onEnterKeyPress}
          popperModifiers={getPopperModifiers(disableFlipping)}
          disabledKeyboardNavigation={disabledKeyboardNavigation}
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
);
