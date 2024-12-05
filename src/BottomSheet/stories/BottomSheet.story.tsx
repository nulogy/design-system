import React from "react";
import { Button } from "../../Button";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export const storyParams = {
  decorators: [(storyFn) => <div style={{ width: "800px", height: "800px" }}>{storyFn()}</div>],
  parameters: {
    chromatic: { delay: 1000 },
  },
} as const;

export default {
  ...storyParams,
  title: "Components/BottomSheet",
};

export const BasicUsage = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
      <BottomSheet title="Edit Profile" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Placeholder />
      </BottomSheet>
    </>
  );
};
