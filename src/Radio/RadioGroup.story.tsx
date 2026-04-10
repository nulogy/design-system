import { expect, userEvent, within } from "storybook/test";
import { Flex, Icon, Radio, RadioGroup, Tooltip } from "../index";

const errorList = ["Error message 1", "Error message 2"];

export default {
	title: "Components/RadioGroup",
	parameters: {
		chromatic: { diffThreshold: 0.3 },
	},
};

export const _RadioGroup = {
	render: () => (
		<RadioGroup labelText="Setting Selection" name="settingSelection">
			<Radio value="a" labelText="Option A" />
			<Radio value="b" labelText="Option B" />
			<Radio value="c" labelText="Option C" />
		</RadioGroup>
	),

	name: "RadioGroup",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("has the correct initial values", async () => {
			const radios = canvas.getAllByRole("radio");
			await expect(radios[0]).not.toBeChecked();
			await expect(radios[1]).not.toBeChecked();
			await expect(radios[2]).not.toBeChecked();
		});
		await step("can be checked", async () => {
			const radios = canvas.getAllByRole("radio");
			await userEvent.click(radios[1]);
			await expect(radios[1]).toBeChecked();
			await userEvent.click(radios[2]);
			await expect(radios[2]).toBeChecked();
			await expect(radios[1]).not.toBeChecked();
		});
	},
};

export const RadioGroupWithAllProps = {
	render: () => (
		<RadioGroup
			labelText="Setting Selection"
			name="settingSelection"
			helpText="Select a setting from the menu below:"
			required
			requirementText="(Required)"
			defaultValue="a"
		>
			<Radio
				value="a"
				labelText={
					<Flex alignItems="center">
						Option A
						<Tooltip
							placement="bottom"
							tooltip="Option A is a special option with extra information"
							defaultOpen
						>
							<Icon icon="help" color="darkBlue" size="x2" ml="x1" />
						</Tooltip>
					</Flex>
				}
			/>
			<Radio value="b" labelText="Option B" />
			<Radio value="c" labelText="Option C" />
		</RadioGroup>
	),

	name: "RadioGroup with all props",

	parameters: {
		chromatic: { diffThreshold: 0.3 },
	},

	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("has the correct initial values", async () => {
			const radios = canvas.getAllByRole("radio");
			await expect(radios[0]).toBeChecked();
			await expect(radios[1]).not.toBeChecked();
			await expect(radios[2]).not.toBeChecked();
		});
	},
};

export const WithErrorMessage = {
	render: () => (
		<RadioGroup
			errorMessage="Please select an option"
			labelText="Setting Selection"
			name="settingSelection"
			defaultValue="a"
		>
			<Radio value="a" labelText="Option A" />
			<Radio value="b" labelText="Option B" />
			<Radio value="c" labelText="Option C" />
		</RadioGroup>
	),

	name: "with error message",
};

export const WithErrorList = {
	render: () => (
		<RadioGroup
			errorMessage="Please select an option"
			errorList={errorList}
			labelText="Setting Selection"
			name="settingSelection"
			defaultValue="a"
		>
			<Radio value="a" labelText="Option A" />
			<Radio value="b" labelText="Option B" />
			<Radio value="c" labelText="Option C" />
		</RadioGroup>
	),

	name: "with error list",
};

export const SetToDisabled = {
	render: () => (
		<RadioGroup
			disabled
			labelText="Setting Selection"
			name="settingSelection"
			defaultValue="a"
		>
			<Radio value="a" labelText="Option A" />
			<Radio value="b" labelText="Option B" />
			<Radio value="c" labelText="Option C" />
		</RadioGroup>
	),

	name: "Set to disabled",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("has the correct initial values", async () => {
			const radios = canvas.getAllByRole("radio");
			await expect(radios[0]).toBeChecked();
			await expect(radios[1]).not.toBeChecked();
			await expect(radios[2]).not.toBeChecked();
		});
		await step("all inputs are disabled", async () => {
			const radios = canvas.getAllByRole("radio");
			await expect(radios[0]).toBeDisabled();
			await expect(radios[1]).toBeDisabled();
			await expect(radios[2]).toBeDisabled();
		});
	},
};

export const Controlled = {
	render: () => (
		<RadioGroup
			labelText="Setting Selection"
			name="settingSelection"
			checkedValue="a"
			onChange={() => {}}
		>
			<Radio value="a" labelText="Option A" />
			<Radio value="b" labelText="Option B" />
			<Radio value="c" labelText="Option C" />
		</RadioGroup>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("has the correct initial values", async () => {
			const radios = canvas.getAllByRole("radio");
			await expect(radios[0]).toBeChecked();
			await expect(radios[1]).not.toBeChecked();
			await expect(radios[2]).not.toBeChecked();
		});
	},
};
