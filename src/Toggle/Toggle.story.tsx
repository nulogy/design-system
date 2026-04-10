import { useRef, useState } from "react";
import { action } from "storybook/actions";
import { expect, userEvent, within } from "storybook/test";
import { Box, Button, Toggle } from "../index";
import { dashed } from "../utils/story/dashed";

const DashedBox = dashed(Box);

export default {
	title: "Components/Toggle",
};

export const _Toggle = {
	render: () => {
		const [toggled, setToggled] = useState(false);
		return (
			<Toggle
				data-testid="toggle-example"
				toggled={toggled}
				onChange={(e) => setToggled(e.target.checked)}
			/>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("changes the value on click", async () => {
			const input = canvasElement.querySelector(
				"[data-testid='toggle-example'] input",
			) as HTMLInputElement;
			await expect(input).not.toBeChecked();
			await userEvent.click(canvas.getByTestId("toggle-example"));
			await expect(input).toBeChecked();
		});
	},
};

export const ToggleWithAllProps = {
	render: () => {
		const [toggled, setToggled] = useState(true);

		return (
			<Toggle
				labelText="Toggle"
				helpText="Turns setting on/off"
				onText="on"
				offText="off"
				toggled={toggled}
				required
				requirementText="(Required)"
				onChange={(e) => setToggled(e.target.checked)}
			/>
		);
	},

	name: "Toggle with all props",
};

export const ToggleSetToDisabled = {
	render: () => {
		return (
			<>
				<Toggle
					labelText="Toggle"
					disabled
					onText="on"
					offText="off"
					onChange={action("on change")}
					data-testid="toggle-example"
				/>
				<Toggle
					id="toggle-2"
					disabled
					onText="on"
					offText="off"
					toggled={true}
					labelText="Toggle"
					onChange={action("on change")}
				/>
			</>
		);
	},

	name: "Toggle set to disabled",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("disabled toggle does not change on click", async () => {
			const input = canvas
				.getByTestId("toggle-example")
				.querySelector("input") as HTMLInputElement;
			await expect(input).toBeDisabled();
			await expect(input).not.toBeChecked();
		});
	},
};

export const WithCustomId = {
	render: () => {
		const [toggled, setToggled] = useState(true);

		return (
			<Toggle
				id="my-custom-id"
				labelText="Toggle"
				onText="on"
				offText="off"
				toggled={toggled}
				onChange={(e) => setToggled(e.target.checked)}
			/>
		);
	},

	name: "With custom id",
};

export const WithText = {
	render: () => {
		const [toggled, setToggled] = useState(true);

		return (
			<Toggle
				labelText="Toggle"
				onText="on"
				offText="off"
				toggled={toggled}
				onChange={(e) => setToggled(e.target.checked)}
			/>
		);
	},

	name: "With text",
};

export const WithLongText = {
	render: () => {
		const [toggled, setToggled] = useState(true);

		return (
			<Toggle
				labelText="Toggle"
				toggled={toggled}
				onText="this state has a very long text label to explain it's state"
				offText="not this one"
				onChange={(e) => setToggled(e.target.checked)}
			/>
		);
	},

	name: "With long text",
};

export const WithContraintWidth = {
	render: () => {
		const [toggled, setToggled] = useState(true);

		return (
			<DashedBox width="200px" padding="x2">
				<Toggle
					labelText="Toggle"
					onText="This is a long On label for the toggle component."
					offText="This is a long Off label for the toggle component."
					toggled={toggled}
					onChange={(e) => setToggled(e.target.checked)}
				/>
			</DashedBox>
		);
	},

	name: "With constraint width",
};

export const UsingRefToControlFocus = {
	render: () => {
		const [toggled, setToggled] = useState(true);
		const ref = useRef<HTMLInputElement>(null);
		const handleClick = () => {
			ref.current.focus();
		};

		return (
			<>
				<Toggle
					id="my-custom-id"
					labelText="Toggle"
					onText="on"
					offText="off"
					toggled={toggled}
					onChange={(e) => setToggled(e.target.checked)}
					ref={ref}
				/>
				<Button onClick={handleClick}>Focus the Toggle</Button>
			</>
		);
	},

	name: "Using ref to control focus",
};
