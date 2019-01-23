import React from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./TextInput";
import theme from "../theme.js";

storiesOf("TextInput", module)
  .add("Testing", () => (
    <React.Fragment>
      <TextInput />
    </React.Fragment>
  ));
