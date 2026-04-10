import {
	addDays,
	isAfter,
	isBefore,
	isSameDay,
	isValid,
	subDays,
} from "date-fns";
import { forwardRef, useEffect, useState } from "react";
import type {
	ReactDatePicker,
	ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import { BasePicker } from "./shared/components/BasePicker";
import { DatePickerHeader } from "./shared/components/DatePickerHeader";
import type { DatePickerProps } from "./shared/types";

const DEFAULT_DATE_FORMAT = "yyyy-MMM-dd";
const DEFAULT_PLACEHOLDER = "YYYY-Mon-DD";

const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(
	(
		{ selected, dateFormat = DEFAULT_DATE_FORMAT, onChange, ...props },
		datePickerRef,
	) => {
		const [selectedDate, setSelectedDate] = useState(selected);
		const [ref] = useState(null);

		useEffect(() => {
			setSelectedDate(selected);
		}, [selected]);

		const handleSelectedDateChange = (date: Date) => {
			if (onChange) {
				onChange(date);
			}
			setSelectedDate(date);
		};

		const handleDownKey = () => {
			const newSelectedDate = isValid(selectedDate)
				? subDays(selectedDate, 1)
				: new Date();
			if (
				!props.minDate ||
				isAfter(newSelectedDate, props.minDate) ||
				isSameDay(newSelectedDate, props.minDate)
			) {
				handleSelectedDateChange(newSelectedDate);
			}
		};

		const handleUpKey = () => {
			const newSelectedDate = isValid(selectedDate)
				? addDays(selectedDate, 1)
				: new Date();
			if (
				!props.maxDate ||
				isBefore(newSelectedDate, props.maxDate) ||
				isSameDay(newSelectedDate, props.maxDate)
			) {
				handleSelectedDateChange(newSelectedDate);
			}
		};

		const handleEnterKey = () => {
			if (ref) {
				const isOpen = ref.isCalendarOpen();
				ref.setOpen(!isOpen);
			}
		};

		return (
			<BasePicker
				{...props}
				selected={selectedDate}
				dateFormat={dateFormat}
				onChange={handleSelectedDateChange}
				ref={datePickerRef}
				defaultFormat={DEFAULT_DATE_FORMAT}
				defaultPlaceholder={DEFAULT_PLACEHOLDER}
				showMonthYearPicker={false}
				disabledKeyboardNavigation
				onUpKeyPress={handleUpKey}
				onDownKeyPress={handleDownKey}
				onEnterKeyPress={handleEnterKey}
				renderHeader={(headerProps: ReactDatePickerCustomHeaderProps) => (
					<DatePickerHeader locale={props.locale} {...headerProps} />
				)}
			/>
		);
	},
);

export default DatePicker;
