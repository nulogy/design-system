import React from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { Button, PrimaryButton, QuietButton } from "../../Button";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export default {
  title: "Components/BottomSheet/Actions",
  decorators: [(storyFn) => <div style={{ width: "800px", height: "800px" }}>{storyFn()}</div>],
  parameters: {
    chromatic: { delay: 3000 },
  },
};

export const WithAHiddenCloseButton = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
        <BottomSheet
          title="User Feedback"
          helpText="Please provide your feedback to help us improve our services"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          primaryAction={({ onClose }) => <PrimaryButton onClick={onClose}>Submit</PrimaryButton>}
          hideCloseButton
        >
          <Placeholder />
        </BottomSheet>
      </>
    );
  },
  name: "With a hidden close button",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("opens when trigger button is clicked without a close button", async () => {
      await userEvent.click(canvas.getByText("Open Sheet"));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
      await expect(screen.queryByText("Close")).not.toBeInTheDocument();
    });
    await step("can be closed using primary action", async () => {
      await userEvent.click(screen.getByText("Submit"));
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });
    await step("can be reopened", async () => {
      await userEvent.click(canvas.getByText("Open Sheet"));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    });
  },
};

export const WithButtons = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
      <BottomSheet
        aria-label="Example BottomSheet"
        title="Edit Profile"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        primaryAction={() => <QuietButton>Next</QuietButton>}
        secondaryAction={() => <QuietButton>Previous</QuietButton>}
      >
        <Placeholder />
      </BottomSheet>
    </>
  );
};
