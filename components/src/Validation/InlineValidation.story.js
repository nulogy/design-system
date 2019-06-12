import React from "react";
import { storiesOf } from "@storybook/react";
import { InlineValidation, List, ListItem, Link } from "../index";

const errorList = ["Entry must be at least 3 characters long.", "Entry must contain a number."];

storiesOf("Inline Validation", module)
  .add("Inline Validation", () => <InlineValidation errorMessage="Something has gone wrong" />)
  .add("with list items", () => <InlineValidation errorMessage="Something has gone wrong" errorList={errorList} />)
  .add("with only list items", () => <InlineValidation errorList={errorList} />)
  .add("with custom content", () => (
    <InlineValidation errorMessage="Something has gone wrong.">
      <List compact leftAlign>
        <ListItem>Entry must be at least 3 characters long.</ListItem>
        <ListItem>Entry must contain a number</ListItem>
        <ListItem>
          <Link href="https://nulogy.design/">Custom Link</Link>
        </ListItem>
      </List>
    </InlineValidation>
  ));
