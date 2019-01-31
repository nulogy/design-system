import React from "react";
import { storiesOf } from "@storybook/react";
import HeaderValidation from "./HeaderValidation";
import List from "../List/List";
import ListItem from "../List/ListItem";

storiesOf("Header Validation", module)
  .add("Header Validation", () => (
    <HeaderValidation
      message="Instructions and description of an error"
      title="Error has occured ..."
    >
      <List compact>
        <ListItem>Affected field</ListItem>
        <ListItem>Unmet criteria</ListItem>
        <ListItem><a href="https://nulogy.design/">Affected field</a></ListItem>
      </List>
    </HeaderValidation>
  ))
  .add("With message only", () => (
    <HeaderValidation
      message="Instructions and description of an error"
      title="Error has occured ..."
    />
  ));
