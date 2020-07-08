import React from "react";
import { storiesOf } from "@storybook/react";
import { Text, Heading1, Heading2, Heading3, Heading4 } from "../index";

storiesOf("Headings", module)
  .add("Heading1", () => <Heading1>Heading 1</Heading1>)
  .add("Heading2", () => <Heading2>Heading 2</Heading2>)
  .add("Heading3", () => <Heading3>Heading 3</Heading3>)
  .add("Heading4", () => <Heading4>Heading 4</Heading4>)
  .add("With a custom margin", () => (
    <>
      <Heading1 mb="x6">Heading1</Heading1>
      <Text>Lorem ipsum</Text>
    </>
  ));
