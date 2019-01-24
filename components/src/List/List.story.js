import React from "react";
import { storiesOf } from "@storybook/react";
import List from "./List";
import theme from "../theme.js";

storiesOf("List", module)
  .add("List", () => (
    <React.Fragment>
      <List/>
    </React.Fragment>
  ));
