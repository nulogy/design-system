import React from "react";
import { storiesOf } from "@storybook/react";

import InlineValidation from "./InlineValidation";
import List from "../List/List";
import ListItem from "../List/ListItem";
import Link from "../Link/Link";

storiesOf("Inline Validation", module)
  .add("Inline Validation", () => (
    <InlineValidation message="Something has gone wrong" />
  ))
  .add("With list items", () => (
    <InlineValidation message="Something has gone wrong">
      <List compact>
        <ListItem>Something has gone wrong.</ListItem>
        <ListItem>Entry must be atleast 3 characters long</ListItem>
        <ListItem><Link href="https://nulogy.design/">See here</Link></ListItem>
      </List>
    </InlineValidation>
  ));
