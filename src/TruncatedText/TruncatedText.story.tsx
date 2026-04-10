import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { Box } from "../Box";
import { Modal } from "../Modal";
import { Heading1 } from "../Type";
import { TruncatedText } from ".";

export default {
	title: "Components/TruncatedText",
};

export const _TruncatedText = {
	render: () => (
		<TruncatedText fontSize="small">
			Special instructions are provided for the shipment
		</TruncatedText>
	),

	name: "TruncatedText",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("shows the truncated text", async () => {
			await expect(canvas.getByTestId("truncated-text")).toHaveTextContent(
				"Special instructions...",
			);
		});
		await step("shows a tooltip with full content on hover", async () => {
			await userEvent.hover(canvas.getByTestId("truncated-text"));
			await waitFor(() =>
				expect(screen.getByRole("tooltip")).toHaveTextContent(
					"Special instructions are provided for the shipment",
				),
			);
		});
	},
};

export const WithoutTooltip = {
	render: () => (
		<TruncatedText showTooltip={false}>
			Special instructions are provided for the shipment
		</TruncatedText>
	),

	name: "without tooltip",
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step("shows the truncated text", async () => {
			await expect(canvas.getByTestId("truncated-text")).toHaveTextContent(
				"Special instructions...",
			);
		});
		await step("does not show a tooltip on hover", async () => {
			await userEvent.hover(canvas.getByTestId("truncated-text"));
			await expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
		});
	},
};

export const UnderMaxCharacters = {
	render: () => <TruncatedText>Item is available</TruncatedText>,
	name: "under max characters",
};

export const WithMaxCharacters10 = {
	render: () => (
		<TruncatedText maxCharacters={10}>Item is available</TruncatedText>
	),
	name: "with max characters 10",
};

export const WithCustomTruncationIndicator = {
	render: () => (
		<TruncatedText indicator=" + 2...">
			Special instructions are provided for the shipment
		</TruncatedText>
	),

	name: "with custom truncation indicator",
};

export const AsTitle = {
	render: () => (
		<TruncatedText element={<Heading1 />}>
			Special instructions are provided for the shipment
		</TruncatedText>
	),

	name: "as title",
};

export const FullWidth = {
	render: () => (
		<Box width="200px">
			<TruncatedText fullWidth>
				Special instructions are truncated because there is not enough space to
				show them.
			</TruncatedText>
			<TruncatedText fullWidth>Instructions fit here.</TruncatedText>
		</Box>
	),

	name: "full width",
};

export const WithoutChildren = {
	render: () => (
		<Box>
			<Heading1>
				No text should appear after this sentence, neither should the page
				crash.
			</Heading1>
			<TruncatedText>{null}</TruncatedText>
			<TruncatedText>{undefined}</TruncatedText>
			<TruncatedText />
		</Box>
	),

	name: "Without children",
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(
			canvas.getAllByTestId("truncated-text")[0],
		).toBeInTheDocument();
	},
};

export const TooltipInsideModal = {
	render: () => {
		return (
			<Modal title="Modal Title">
				<TruncatedText tooltipProps={{ defaultOpen: true }}>
					The point of this test is to see if the tooltip is visible and shown
					over the modal and its overlay
				</TruncatedText>
			</Modal>
		);
	},

	name: "Tooltip inside modal",
};
