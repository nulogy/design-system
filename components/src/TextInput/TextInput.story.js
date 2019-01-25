import React from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./TextInput";

storiesOf("TextInput", module)
  .add("Testing", () => (
    <React.Fragment>
      <TextInput />
    </React.Fragment>
  ));
