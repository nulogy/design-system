import propTypes from "@styled-system/prop-types";
import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SpaceProps } from "styled-system";
import { DatePicker } from "../DatePickers";
import { MaybeFieldLabel } from "../FieldLabel";
import { Flex } from "../Flex";
import { Field } from "../Form";
import type { InputFieldProps } from "../Input/InputField";
import { type ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { ScrollTimePicker, type ScrollTimePickerProps } from "../ScrollTimePicker";
import { getSubset, omitSubset } from "../utils/subset";
import { InlineValidation } from "../Validation";
import { combineDateAndTime, formatFieldValue, splitDateTime } from "./DateTimePicker.utils";

export interface DateTimePickerProps extends SpaceProps {
  /** Controlled instant. */
  value?: Date;
  /** Uncontrolled initial instant. */
  defaultValue?: Date;
  /** Fires with the merged instant on any change, or `undefined` while no date is selected. */
  onChange?: (value: Date | undefined) => void;
  /** Interpret and emit the instant in UTC rather than browser-local time. Default false. */
  utc?: boolean;
  /** Show a seconds column on the time field. Default false. */
  showSeconds?: boolean;
  disabled?: boolean;
  /**
   * Opt into native form submission: renders a hidden input under this `name` carrying the instant
   * as an ISO 8601 string matching the displayed wall-clock — UTC (`…Z`, via `toISOString()`) when
   * `utc`, or the local wall-clock with no zone suffix otherwise. A partial selection is completed
   * for submission: a time with no date uses today, a date with no time uses 00:00; the field is ""
   * only when nothing is selected. Without a `name` the component is controlled-only and submits
   * nothing natively.
   */
  name?: string;
  /** Optional label for the whole date+time group. */
  labelText?: string;
  errorMessage?: string;
  errorList?: string[];
  /** Day-level bounds forwarded to the date field. */
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  locale?: string;
  variant?: ComponentVariant;
  /** Escape hatches to customize each sub-field. */
  dateInputProps?: InputFieldProps;
  timeProps?: Partial<ScrollTimePickerProps>;
  className?: string;
  id?: string;
}

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      utc = false,
      showSeconds = false,
      disabled = false,
      labelText,
      errorMessage,
      errorList,
      name,
      minDate,
      maxDate,
      dateFormat,
      locale,
      variant,
      dateInputProps,
      timeProps,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const componentVariant = useComponentVariant(variant);
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);

    const isControlled = value !== undefined;
    const hasError = !!(errorMessage || errorList);

    // Two sub-values back the two fields. Initialize from the controlled value if present, else the
    // uncontrolled default.
    const initial = splitDateTime(value ?? defaultValue, { utc, showSeconds });
    const [dateForPicker, setDateForPicker] = useState<Date | undefined>(initial.dateForPicker);
    const [time, setTime] = useState<string>(initial.time);

    // Controlled sync: re-derive both fields whenever the external value (or the format flags that
    // change how it splits) changes. This never calls onChange — it is a pure external→internal
    // sync, so an inline `onChange={setValue}` cannot loop (mirrors DatePicker's `selected` effect).
    useEffect(() => {
      if (!isControlled) return;
      const next = splitDateTime(value, { utc, showSeconds });
      setDateForPicker(next.dateForPicker);
      setTime(next.time);
    }, [value, utc, showSeconds, isControlled]);

    // Emit the merged instant. Called from the change handlers carrying the fresh value as an
    // override, because the corresponding state setter hasn't updated the closure yet this render
    // (the loop-safe pattern from DateRange's `emitRange`).
    const emit = (overrides: { dateForPicker?: Date | undefined; time?: string }) => {
      const nextDate = "dateForPicker" in overrides ? overrides.dateForPicker : dateForPicker;
      const nextTime = "time" in overrides ? overrides.time : time;
      onChange?.(combineDateAndTime(nextDate, nextTime ?? "", { utc, showSeconds }));
    };

    const handleDateChange = (date: Date | null) => {
      const nextDate = date ?? undefined;
      if (!isControlled) setDateForPicker(nextDate);
      emit({ dateForPicker: nextDate });
    };

    const handleTimeChange = (nextTime: string) => {
      if (!isControlled) setTime(nextTime);
      emit({ time: nextTime });
    };

    return (
      <Field id={id} className={className} {...spaceProps} {...restProps}>
        <MaybeFieldLabel labelText={labelText}>
          <Flex alignItems="flex-start">
            {/* Wrap the width:100% DatePicker Field so it shrinks to its content instead of
                stretching the row (the RangeContainer trick). */}
            <Flex>
              <DatePicker
                selected={dateForPicker}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat={dateFormat}
                locale={locale}
                inputProps={{
                  "aria-label": t("select a date"),
                  error: hasError,
                  disabled,
                  ...dateInputProps,
                }}
              />
            </Flex>
            <ScrollTimePicker
              ref={ref}
              ml="x1"
              value={time}
              utc={utc}
              showSeconds={showSeconds}
              variant={componentVariant}
              disabled={disabled}
              error={hasError}
              aria-label={t("select a time")}
              onChange={handleTimeChange}
              {...timeProps}
            />
          </Flex>
        </MaybeFieldLabel>
        {name && (
          <input
            type="hidden"
            name={name}
            value={formatFieldValue(dateForPicker, time, new Date(), { utc, showSeconds })}
            data-testid="date-time-picker-hidden-input"
          />
        )}
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  },
);

export default DateTimePicker;
