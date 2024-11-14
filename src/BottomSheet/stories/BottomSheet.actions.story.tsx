import React from "react";
import { PrimaryButton, QuietButton } from "../../Button";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export default {
  title: "Components/BottomSheet/Actions",
};

export const WithCTAButton = () => {
  return (
    <BottomSheet
      title="User Feedback"
      helpText="Please provide your feedback to help us improve our services"
      isOpen
      hideCloseButton
      primaryAction={() => <PrimaryButton onClick={close}>Submit</PrimaryButton>}
    >
      <Placeholder />
    </BottomSheet>
  );
};

export const WithButtons = () => {
  return (
    <BottomSheet
      aria-label="Example BottomSheet"
      title="Edit Profile"
      isOpen
      primaryAction={() => <QuietButton>Next</QuietButton>}
      secondaryAction={() => <QuietButton>Previous</QuietButton>}
    >
      <Placeholder />
    </BottomSheet>
  );
};
