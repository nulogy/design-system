import React from "react";
import { InlineValidation, List, ListItem, Link } from "../index";

const errorList = ["Entry must be at least 3 characters long.", "Entry must contain a number."];

export default {
  title: "Components/Inline Validation"
};

export const _InlineValidation = () => <InlineValidation errorMessage="Something has gone wrong" />;
export const WithListItems = () => <InlineValidation errorMessage="Something has gone wrong" errorList={errorList} />;

WithListItems.story = {
  name: "with list items"
};

export const WithOnlyListItems = () => <InlineValidation errorList={errorList} />;

WithOnlyListItems.story = {
  name: "with only list items"
};

export const WithCustomContent = () => (
  <InlineValidation errorMessage="Something has gone wrong.">
    <List compact leftAlign>
      <ListItem>Entry must be at least 3 characters long.</ListItem>
      <ListItem>Entry must contain a number</ListItem>
      <ListItem>
        <Link href="https://nulogy.design/">Custom Link</Link>
      </ListItem>
    </List>
  </InlineValidation>
);

WithCustomContent.story = {
  name: "with custom content"
};