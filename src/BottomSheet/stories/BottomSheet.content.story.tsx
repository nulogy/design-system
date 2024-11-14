import React from "react";
import { Link } from "../../Link";
import { Text } from "../../Type";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export default {
  title: "Components/BottomSheet/Content",
};

export const WithHelpText = () => {
  return (
    <BottomSheet
      aria-label="Example BottomSheet"
      title="Edit Profile"
      helpText="Update your profile information to access exclusive features."
      isOpen
    >
      <Placeholder />
    </BottomSheet>
  );
};

export const WithHelpContent = () => {
  return (
    <BottomSheet
      aria-label="Example BottomSheet"
      title="Edit Profile"
      helpText={
        <Text>
          Update your profile information to access exclusive features. <Link href="#learn-more">Learn more</Link>
        </Text>
      }
      isOpen
    >
      <Placeholder />
    </BottomSheet>
  );
};
