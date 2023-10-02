import React from "react";
import { select } from "@storybook/addon-knobs";
import { Box } from "../Box";
import { Stack } from ".";
import { Divider } from "../Divider";

export default {
  title: "Components/Stack",
  component: Stack,
};

const widths = {
  small: "191px",
  medium: "351px",
  large: "432px",
};

const Rectangle = ({ width }: { width: keyof typeof widths }) => (
  <Box height="100px" width={widths[width]} bg="#85EB8B" />
);

export const Default = () => (
  <Stack>
    <Rectangle width="medium" />
    <Rectangle width="large" />
    <Rectangle width="small" />
  </Stack>
);

export const WithAlignment = () => {
  return (
    <Stack alignment="right">
      <Rectangle width="medium" />
      <Rectangle width="large" />
      <Rectangle width="small" />
    </Stack>
  );
};
export const WithNDSDivider = () => {
  return (
    <Stack alignment="right">
      <Rectangle width="medium" />
      <Rectangle width="large" />
      <Rectangle width="small" />
    </Stack>
  );
};
