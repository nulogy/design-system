import { format } from "date-fns";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import MonthPicker from "../MonthPicker";

export default {
	title: "Components/DatePickers/MonthPicker",
};

export const Default = {
	render: () => <MonthPicker inputProps={{ labelText: "Expiry Date" }} />,
	name: "Default",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("can open a month picker on click", async () => {
			expect(document.querySelector(".react-datepicker-popper")).toBeNull();
			await userEvent.click(canvas.getByLabelText("select a date"));
			await waitFor(() =>
				expect(
					document.querySelector(".react-datepicker-popper"),
				).toBeInTheDocument(),
			);
		});
		await step("displays 12 months", async () => {
			const monthElements = document.querySelectorAll(
				".react-datepicker__month-text",
			);
			expect(monthElements).toHaveLength(12);
		});
		await step("can select a month by clicking", async () => {
			const marchOption = Array.from(
				document.querySelectorAll(".react-datepicker__month-text"),
			).find((el) => el.textContent === "Mar") as HTMLElement;
			await userEvent.click(marchOption);
			await waitFor(() =>
				expect(
					document.querySelector(".react-datepicker-popper"),
				).not.toBeInTheDocument(),
			);
		});
	},
};

export const WithPlaceholder = () => {
	return (
		<MonthPicker
			inputProps={{ labelText: "Expiry Date", placeholder: "Select month" }}
		/>
	);
};

export const Disabled = () => {
	return (
		<MonthPicker inputProps={{ labelText: "Expiry Date", disabled: true }} />
	);
};

export const WithDefaultValue = () => {
	const defaultDate = new Date();
	defaultDate.setMonth(defaultDate.getMonth() - 1);
	return (
		<MonthPicker
			inputProps={{ labelText: "Expiry Date" }}
			selected={defaultDate}
		/>
	);
};

export const WithMinMaxDate = () => {
	const minDate = new Date();
	minDate.setFullYear(minDate.getFullYear() - 1);
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);
	return (
		<MonthPicker
			inputProps={{ labelText: "Expiry Date" }}
			minDate={minDate}
			maxDate={new Date()}
		/>
	);
};

export const AdvancedUsage = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const [hasError, setHasError] = useState(false);

	const handleMonthChange = (date) => {
		setSelectedDate(date);
		setHasError(false);

		// Format for display: "January 2023"
		setInputValue(format(date, "MMMM yyyy"));
	};

	const handleInputChange = (value) => {
		setInputValue(value);
		// Custom validation could be implemented here
	};

	return (
		<MonthPicker
			selected={selectedDate}
			onChange={handleMonthChange}
			onInputChange={handleInputChange}
			minDate={new Date(2023, 0, 1)}
			maxDate={new Date()}
			errorMessage={hasError ? "Please select a valid month" : undefined}
			inputProps={{
				value: inputValue,
				inputWidth: "300px",
				placeholder: "Select a month",
				labelText: "Reporting Month",
				requirementText: "(Required)",
				helpText: "Select the month for your monthly report submission",
			}}
		/>
	);
};
