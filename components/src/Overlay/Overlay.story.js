import React from "react";
import { storiesOf } from "@storybook/react";
import { Overlay } from ".";
import { Text } from "../index";

storiesOf("Overlay", module).add("Overlay", () => (
  <>
    <Text>Background content</Text>
    <Overlay>Overlay content</Overlay>
  </>
));
