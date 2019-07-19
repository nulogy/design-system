import React from "react";
import { storiesOf } from "@storybook/react";
import { HeaderValidation, List, ListItem } from "../index";

const errorList = ["Affected field", "Unmet criteria"];

storiesOf("Header Validation", module)
  .add("Header Validation", () => (
    <HeaderValidation
      errorMessage="Instructions and description of an error"
      title="Error has occured ..."
      errorList={errorList}
    />
  ))
  .add("with message only", () => (
    <HeaderValidation errorMessage="Instructions and description of an error" title="Error has occured ..." />
  ))
  .add("with custom content", () => (
    <HeaderValidation errorMessage="Instructions and description of an error" title="Error has occured ...">
      <List compact leftAlign>
        <ListItem>Affected field</ListItem>
        <ListItem>Unmet criteria</ListItem>
        <ListItem>
          <a href="https://nulogy.design/">Custom Link</a>
        </ListItem>
      </List>
    </HeaderValidation>
  ));
