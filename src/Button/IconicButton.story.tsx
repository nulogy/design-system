import { Box } from "../Box";
import { Flex } from "../Flex";
import { IconicButton } from "../index";
import { StatusIndicator } from "../StatusIndicator";

export default {
	title: "Components/IconicButton",
};

export const WithoutALabel = {
	render: () => <IconicButton icon="delete" />,
	name: "without a label",
};

export const WithLabel = {
	render: () => <IconicButton icon="delete">Delete</IconicButton>,
	name: "with label",
};

export const WithALongLabel = {
	render: () => (
		<IconicButton icon="user">
			I am an Iconic Button with a really really really long label
		</IconicButton>
	),

	name: "with a long label",
};

export const SetToDisabled = {
	render: () => (
		<>
			<IconicButton icon="cancel" disabled>
				Cancel
			</IconicButton>
			<IconicButton icon="lock" disabled>
				Lock
			</IconicButton>
		</>
	),

	name: "set to disabled",
};

export const WithAHiddenLabel = {
	render: () => (
		<IconicButton ml="x6" labelHidden icon="user">
			Hidden Label
		</IconicButton>
	),

	name: "with a hidden label",
};

export const WithACustomIconSize = {
	render: () => (
		<IconicButton icon="user" iconSize="50px" labelHidden>
			I am an Iconic Button
		</IconicButton>
	),

	name: "with a custom icon size",
};

export const WithACustomColor = {
	render: () => (
		<IconicButton color="red" icon="close">
			Close
		</IconicButton>
	),

	name: "with a custom color",
};

export const WithATooltipAndLabel = {
	render: () => (
		<IconicButton tooltip="Stop job" icon="close">
			Stop
		</IconicButton>
	),

	name: "with a tooltip and label",
};

export const WithAComplicatedTooltipAndLabel = {
	render: () => (
		<IconicButton tooltip={<Box>Hello</Box>} icon="close">
			Please stop
		</IconicButton>
	),

	name: "with a complicated tooltip and label",
};

export const rightAligned = {
	render: () => (
		<Flex px="x3" height="150px">
			<Flex justifyContent="flex-end" alignItems="flex-start" width="100%">
				<IconicButton icon="rightArrow" labelHidden>
					I am an Iconic Button
				</IconicButton>
				<IconicButton icon="leftArrow" labelHidden>
					I am an Iconic Button 2
				</IconicButton>
			</Flex>
		</Flex>
	),

	parameters: {
		chromatic: { diffThreshold: 0.3 },
	},
};

export const WithACustomFontSize = {
	render: () => (
		<Flex flexDirection="column">
			<IconicButton fontSize="small" tooltip="Stop job" icon="close">
				This is an IconicButton with a small font size
			</IconicButton>
			<IconicButton fontSize="large" tooltip="Stop job" icon="close">
				This is an IconicButton with a large font size
			</IconicButton>
			<IconicButton fontSize="48px" tooltip="Stop job" icon="close">
				This is an IconicButton with 48px font size
			</IconicButton>
		</Flex>
	),

	name: "with a custom font size",
};

export const WithNonTextChildren = {
	render: () => (
		<IconicButton fontSize="small" aria-label="warnings" icon="warning">
			<Flex>
				<Box as="span" pr="x1">
					Warnings
				</Box>
				<StatusIndicator type="informative">3</StatusIndicator>
			</Flex>
		</IconicButton>
	),

	name: "with non text children",
};

export const WithCustomHoverBackgroundThemeColor = () => (
	<IconicButton
		hoverBackgroundColor="lightYellow"
		fontSize="small"
		aria-label="warnings"
		icon="warning"
	>
		<Flex>
			<Box as="span" pr="x1">
				Warnings
			</Box>
		</Flex>
	</IconicButton>
);

export const WithCustomHoverBackgroundNonThemeColor = () => (
	<IconicButton
		hoverBackgroundColor="#FA8072"
		fontSize="small"
		aria-label="warnings"
		icon="warning"
	>
		<Flex>
			<Box as="span" pr="x1">
				Warnings
			</Box>
		</Flex>
	</IconicButton>
);

export const WithLargerIcons = () => (
	<IconicButton icon="chatBubble">Add comment</IconicButton>
);
