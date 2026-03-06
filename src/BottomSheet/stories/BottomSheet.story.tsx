import React from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../../Button";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export default {
  title: "Components/BottomSheet",
  decorators: [(storyFn) => <div style={{ width: "800px", height: "800px" }}>{storyFn()}</div>],
  parameters: {
    chromatic: { delay: 3000 },
  },
};

export const BasicUsage = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
        <BottomSheet title="Edit Profile" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Placeholder />
        </BottomSheet>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opens when trigger button is clicked", async () => {
      await userEvent.click(canvas.getByText("Open Sheet"));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    });
    await step("closes when Close button is clicked", async () => {
      await userEvent.click(screen.getByText("Close"));
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });
    await step("can be reopened", async () => {
      await userEvent.click(canvas.getByText("Open Sheet"));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    });
  },
};
