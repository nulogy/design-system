import React, { useRef } from "react";
import { Button, Checkbox } from "../index";

type CheckboxState = {
	checkbox1: boolean;
	checkbox2: boolean;
};

class CheckboxWithState extends React.Component<object, CheckboxState> {
	constructor(props) {
		super(props);

		this.state = { checkbox1: false, checkbox2: false };
	}

	handleChange = (key) => {
		this.setState((state) => ({
			...state,
			[key]: !state[key],
		}));
	};

	render() {
		const { checkbox1, checkbox2 } = this.state;
		return (
			<>
				<Checkbox
					id="checkbox-1"
					checked={checkbox1}
					onChange={() => this.handleChange("checkbox1")}
					labelText="I am controlled and checked"
				/>
				<Checkbox
					id="checkbox-2"
					checked={checkbox2}
					onChange={() => this.handleChange("checkbox2")}
					labelText="I am controlled and unchecked"
				/>
			</>
		);
	}
}

export default {
	title: "Components/Checkbox",
};

export const _Checkbox = () => (
	<Checkbox p="x3" id="checkbox" labelText="I am a checkbox" />
);

export const Multiline = {
	render: () => (
		<Checkbox
			p="x3"
			id="checkbox"
			labelText="Lorem ipsum dolor sit amet consecutor"
		/>
	),
	decorators: [
		(Story) => (
			<div style={{ width: "200px" }}>
				<Story />
			</div>
		),
	],
};

export const SetToDefaultChecked = {
	render: () => (
		<Checkbox
			id="checkbox"
			defaultChecked
			labelText="I am checked by default"
		/>
	),
	name: "Set to defaultChecked",
};

export const SetToDisabled = {
	render: () => (
		<>
			<Checkbox id="checkbox-1" disabled labelText="I am disabled" />
			<Checkbox id="checkbox-2" checked disabled labelText="I am disabled" />
		</>
	),

	name: "Set to disabled",
};

export const CheckboxWithNoLabel = {
	render: () => (
		<>
			<Checkbox />
		</>
	),

	name: "Checkbox with no label",
};

export const SetToError = {
	render: () => (
		<>
			<Checkbox id="checkbox" error labelText="I am error" />
			<Checkbox id="checkbox" defaultChecked error labelText="I am error" />
		</>
	),

	name: "Set to error",
};

export const SetToRequired = {
	render: () => (
		<>
			<Checkbox id="checkbox" labelText="I am a checkbox" required />
		</>
	),

	name: "Set to required",
};

export const Indeterminate = {
	render: () => (
		<>
			<Checkbox
				id="checkbox"
				labelText="I am an indeterminate checkbox"
				readOnly
				checked
				indeterminate
			/>
			<Checkbox
				id="checkbox"
				labelText="I am a unchecked indeterminate checkbox"
				readOnly
				checked={false}
				indeterminate
			/>
			<Checkbox
				id="checkbox"
				labelText="I am an indeterminate checkbox with an error"
				readOnly
				checked
				indeterminate
				error
			/>
			<Checkbox
				id="checkbox"
				labelText="I am a disabled indeterminate checkbox"
				readOnly
				checked
				indeterminate
				disabled
			/>
		</>
	),

	name: "indeterminate",
};

export const WithState = {
	render: () => <CheckboxWithState />,
	name: "With state",
};

export const UsingRefToControlFocus = {
	render: () => {
		const ref = useRef(null);
		const handleClick = () => {
			ref.current.focus();
		};

		return (
			<>
				<Checkbox
					ref={ref}
					labelText="I am a unchecked indeterminate checkbox"
					readOnly
					checked={false}
					indeterminate
				/>
				<Button onClick={handleClick}>Focus the Input</Button>
			</>
		);
	},

	name: "using ref to control focus",
};
