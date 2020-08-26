import React from "react";
import { storiesOf } from "@storybook/react";
import { Overlay } from ".";
import { Text, Card } from "../index";

storiesOf("Components/Overlay", module)
  .add("Light (default)", () => (
    <>
      <Text>Background content</Text>
      <Overlay>Overlay content</Overlay>
    </>
  ))
  .add("Dark", () => (
    <>
      <Text>Background content</Text>
      <Overlay dark>
        <Card>
          <Text>Overlay content</Text>
        </Card>
      </Overlay>
    </>
  ));
