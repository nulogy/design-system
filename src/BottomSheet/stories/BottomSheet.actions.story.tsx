import React from "react";
import { Button, PrimaryButton, QuietButton } from "../../Button";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export default {
  title: "Components/BottomSheet/Actions",
};

export const WithAHiddenCloseButton = () => {
  const [isOpen, setIsOpen] = React.useState(true);

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
