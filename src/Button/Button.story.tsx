import { Flex } from "../Flex";
import { Heading4 } from "../Type";
import { Button, DangerButton, PrimaryButton, QuietButton } from ".";

export default {
	title: "Components/Buttons",
};

export const _Button = () => <Button>Create project</Button>;

export const _PrimaryButton = {
	render: () => <PrimaryButton>Create project</PrimaryButton>,
	name: "PrimaryButton",
};

export const _DangerButton = {
	render: () => <DangerButton>Delete project</DangerButton>,
	name: "DangerButton",
};

export const _QuietButton = {
	render: () => <QuietButton>Create project</QuietButton>,
	name: "QuietButton",
};

export const WithDifferentSizes = () => (
	<Flex flexDirection="column" gap="x3">
		<Flex flexDirection="column" gap="x1">
			<Heading4>Medium size (default)</Heading4>
			<Flex gap="x1">
				<Button>Secondary Button</Button>
				<PrimaryButton>Primary Button</PrimaryButton>
				<DangerButton>Danger Button</DangerButton>
				<QuietButton>Quiet Button</QuietButton>
			</Flex>
		</Flex>
		<Flex flexDirection="column" gap="x1">
			<Heading4>Small size</Heading4>
			<Flex gap="x1">
				<Button size="small">Secondary Button</Button>
				<PrimaryButton size="small">Primary Button</PrimaryButton>
				<DangerButton size="small">Danger Button</DangerButton>
				<QuietButton size="small">Quiet Button</QuietButton>
			</Flex>
		</Flex>
	</Flex>
);

export const WithASelectedIcon = {
	render: () => (
		<>
			<Button
				icon="add"
				iconSide="left"
				size="small"
				onClick={() => {}}
				disabled
			>
				Create project
			</Button>
			<Button icon="add" iconSide="right">
				Create project
			</Button>
		</>
	),

	name: "With a selected Icon",
};

export const SetToFullWidth = {
	render: () => <PrimaryButton fullWidth>Create project</PrimaryButton>,
	name: "Set to full width",
};

export const SetToDisabled = {
	render: () => <PrimaryButton disabled>Create project</PrimaryButton>,
	name: "Set to disabled",
};

export const AsALink = {
	render: () => (
		<PrimaryButton asLink href="/">
			Create project
		</PrimaryButton>
	),

	name: "As a link",
};
