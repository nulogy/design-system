import React from "react";
import { Placeholder } from "../../utils/story/placeholder";
import BottomSheet from "../BottomSheet";

export default {
  title: "Components/BottomSheet",
};

export const BasicUsage = () => {
  return (
    <BottomSheet title="Edit Profile" isOpen>
      <Placeholder />
    </BottomSheet>
  );
};
