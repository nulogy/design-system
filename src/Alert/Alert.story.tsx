import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Alert, Flex } from "../index";
import { Link } from "../Link";

export default {
  title: "Components/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

const alertTypes = ["danger", "informative", "success", "warning"] as const;

export const AlertTypes: Story = {
  render: () => (
    <Flex flexDirection="column" gap="x1">
      {alertTypes.map((type) => (
        <Alert key={type} type={type} title={type}>
          This is an alert with type &quot;{type}&quot;
        </Alert>
      ))}
    </Flex>
  ),
};

export const WithACloseButton: Story = {
  args: {
    isCloseable: true,
    children: "This is an alert with a close button",
  },
  name: "With a close button",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toBeVisible();
  },
};

export const ClosesWhenDismissed: Story = {
  args: {
    isCloseable: true,
    children: "This is an alert with a close button",
  },
  name: "Closes when dismissed",
  // Dismissing unmounts the alert (Alert returns null), so the post-play DOM is
  // empty — a useless snapshot that also diffs against the open-alert baseline.
  // The visual lives in "With a close button"; this story owns the interaction.
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("hides the alert when closed", async () => {
      await userEvent.click(canvas.getByLabelText("Close"));
      await waitFor(() => expect(canvas.queryByRole("alert")).not.toBeInTheDocument());
    });
  },
};

export const WithATitle: Story = {
  args: {
    title: "Danger title!",
    type: "danger",
    children: "Danger alert",
  },
  name: "With a title",
};

export const WithALink: Story = {
  args: {
    children: (
      <>
        An alert with <Link href="/">linked details</Link>.
      </>
    ),
  },
  name: "With a link",
};
