import {
	Box,
	Button,
	ButtonGroup,
	DangerButton,
	IconicButton,
	PrimaryButton,
	QuietButton,
} from "../index";

export default {
	title: "Components/ButtonGroup",
};

export const _ButtonGroup = {
	render: () => (
		<Box bg="whiteGrey" p="x2" width="500px">
			<ButtonGroup>
				<PrimaryButton>Button</PrimaryButton>
				<Button>Button</Button>
				<Button>Button</Button>
			</ButtonGroup>
		</Box>
	),

	name: "ButtonGroup",
};

export const WithAlignmentRight = {
	render: () => (
		<ButtonGroup alignment="right" p="x2" bg="whiteGrey" width="500px">
			<PrimaryButton>Button</PrimaryButton>
			<Button>Button</Button>
			<Button>Button</Button>
		</ButtonGroup>
	),

	name: "with alignment right",
};

export const WithAlignmentSpaced = {
	render: () => (
		<ButtonGroup alignment="spaced" bg="whiteGrey" p="x2" width="500px">
			<PrimaryButton>Button</PrimaryButton>
			<Button>Button</Button>
		</ButtonGroup>
	),

	name: "with alignment spaced",
};

export const MoreButtonTypes = {
	render: () => (
		<ButtonGroup bg="whiteGrey" p="x2" width="600px">
			<PrimaryButton>Button</PrimaryButton>
			<DangerButton>Button</DangerButton>
			<Button>Button</Button>
			<QuietButton>Button</QuietButton>
			<IconicButton icon="menu" />
			<IconicButton icon="menu">Button</IconicButton>
		</ButtonGroup>
	),

	name: "more button types",
};

export const WrappingButtons = {
	render: () => (
		<>
			<ButtonGroup bg="whiteGrey" p="x2">
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
			</ButtonGroup>
			<ButtonGroup alignment="right" bg="whiteGrey" p="x2" mt="x2">
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
			</ButtonGroup>
		</>
	),

	name: "wrapping buttons",
	parameters: { viewport: { defaultViewport: "extraSmall" } },
};
