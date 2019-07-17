import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, ButtonSet, Button, PrimaryButton, DangerButton, QuietButton, IconicButton } from "../index";

storiesOf("ButtonSet", module).add("ButtonSet", () => (
  <Box bg="whiteGrey" p="x2" width="500px">
    <ButtonSet>
      <Button>Button</Button>
      <Button>Button</Button>
      <PrimaryButton>Button</PrimaryButton>
    </ButtonSet>
  </Box>
));
