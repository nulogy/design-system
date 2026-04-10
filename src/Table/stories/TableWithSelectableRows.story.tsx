import { action } from "storybook/actions";
import { expect, userEvent, within } from "storybook/test";
import { Table } from "..";

const columns = [
	{ label: "Date", dataKey: "date" },
	{ label: "Expected Quantity", dataKey: "expectedQuantity" },
	{ label: "Actual Quantity", dataKey: "actualQuantity" },
];

const rowData = [
	{
		date: "2019-10-01",
		expectedQuantity: "2,025 eaches",
		actualQuantity: "1,800 eaches",
		id: "r1",
	},
	{
		date: "2019-10-02",
		expectedQuantity: "2,475 eaches",
		actualQuantity: "2,250 eaches",
		id: "r2",
	},
	{
		date: "2019-10-03",
		expectedQuantity: "2,475 eaches",
		actualQuantity: "1,425 eaches",
		id: "r3",
	},
	{
		date: "2019-10-04",
		expectedQuantity: "2,475 eaches",
		actualQuantity: "675 eaches",
		id: "r4",
	},
	{
		date: "2019-10-07",
		expectedQuantity: "2,475 eaches",
		actualQuantity: "1,575 eaches",
		id: "r5",
	},
	{
		date: "2019-10-22",
		expectedQuantity: "1,725 eaches",
		actualQuantity: "-",
		id: "r7",
	},
	{
		date: "2019-10-23",
		expectedQuantity: "2,475 eaches",
		actualQuantity: "-",
		id: "r8",
	},
	{
		date: "2019-10-24",
		expectedQuantity: "2,475 eaches",
		actualQuantity: "-",
		id: "r9",
	},
];

export default {
	title: "Components/Table/with selectable rows",
};

export const WithSelectableRows = {
	render: () => (
		<Table
			columns={columns}
			rows={rowData}
			hasSelectableRows
			onRowSelectionChange={action("row selection changed")}
		/>
	),

	name: "with selectable rows",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("can select a row by clicking its checkbox", async () => {
			const tableBody = canvas.getByTestId("table-body");
			const rowCheckboxes = within(tableBody).getAllByTestId("visual-checkbox");
			await userEvent.click(rowCheckboxes[0]);
			const rowInputs = canvasElement.querySelectorAll(
				"[data-testid='table-body'] [type='checkbox']",
			);
			await expect(rowInputs[0] as HTMLInputElement).toBeChecked();
		});
		await step("can select all rows using the header checkbox", async () => {
			const tableHead = canvasElement.querySelector(
				"[data-testid='table-head']",
			) as HTMLElement;
			await userEvent.click(within(tableHead).getByTestId("visual-checkbox"));
			const headerInput = canvasElement.querySelector(
				"[data-testid='table-head'] [type='checkbox']",
			) as HTMLInputElement;
			await expect(headerInput).toBeChecked();
		});
	},
};

export const WithPreselectedRows = {
	render: () => (
		<Table
			columns={columns}
			rows={rowData}
			hasSelectableRows
			selectedRows={["2019-10-01"]}
			keyField="date"
			onRowSelectionChange={action("row selection changed")}
		/>
	),

	name: "with preselected rows",
};
