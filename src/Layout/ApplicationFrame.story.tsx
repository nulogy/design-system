import React from "react";
import { ApplicationFrame, Navigation } from "..";

export default {
  title: "Components/ApplicationFrame",
  parameters: {
    layout: "fullscreen",
  },
};

export const _ApplicationFrame = () => <ApplicationFrame environment="training" navBar={<Navigation />} />;
