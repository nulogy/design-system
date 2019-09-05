import React from "react";
import { storiesOf } from "@storybook/react";
import { NDSProvider, Button, Tooltip } from "..";

storiesOf("StoriesForTests/Tooltip", module).add("Base", () => (
  <NDSProvider>
    <Tooltip placement="bottom" tooltip="I am a Tooltip!">
      <Button>Hover me</Button>
    </Tooltip>
  </NDSProvider>
));
