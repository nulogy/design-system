import React from "react";
import { storiesOf } from "@storybook/react";
import { Button, Tooltip } from "..";

storiesOf("StoriesForTests/Tooltip", module)
  .add("Base", () => (
    <>
      <Tooltip placement="bottom" tooltip="I am a Tooltip!">
        <Button>Hover me</Button>
      </Tooltip>
    </>
  ))
  .add("Open by default", () => (
    <>
      <Tooltip tooltip="I am an open Tooltip!" defaultOpen>
        <Button>Hover me</Button>
      </Tooltip>
    </>
  ));
