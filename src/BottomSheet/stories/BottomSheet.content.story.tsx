import React from "react";
import { Button } from "../../Button";
import { Link } from "../../Link";
import { Text } from "../../Type";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export default {
  title: "Components/BottomSheet/Content",
  decorators: [(storyFn) => <div style={{ width: "800px", height: "800px" }}>{storyFn()}</div>],
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const WithHelpText = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
      <BottomSheet
        aria-label="Example BottomSheet"
        title="Edit Profile"
        helpText="Update your profile information to access exclusive features."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Placeholder />
      </BottomSheet>
    </>
  );
};

export const WithHelpContent = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
      <BottomSheet
        aria-label="Example BottomSheet"
        title="Edit Profile"
        helpText={
          <Text>
            Update your profile information to access exclusive features. <Link href="#learn-more">Learn more</Link>
          </Text>
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Placeholder />
      </BottomSheet>
    </>
  );
};
