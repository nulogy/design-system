import React from "react";
import { storiesOf } from "@storybook/react";
import List from "./List";
import theme from "../theme.js";

storiesOf("List", module)
  .add("List", () => (
    <React.Fragment>
      <List />
    </React.Fragment>
  ))
  .add("With custom colour", () => (
    <React.Fragment>
      <List color='red' />
    </React.Fragment>
  ))
  .add("With custom font size and line height", () => (
    <React.Fragment>
      <List fontSize={ 0 } lineHeight='smallTextBase' />
    </React.Fragment>
  ))
  .add("With compact spacing", () => (
    <React.Fragment>
      <List spacing='compact' />
    </React.Fragment>
  ));
