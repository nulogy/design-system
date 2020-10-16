import React from "react";
import { List, ListItem } from "../index";

export default {
  title: "Components/List"
};

export const _List = () => (
  <List>
    <ListItem>List Item 1</ListItem>
    <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
    <ListItem>List Item 3</ListItem>
  </List>
);

export const WithCustomColour = () => (
  <List color="red">
    <ListItem>List Item 1</ListItem>
    <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
    <ListItem>List Item 3</ListItem>
  </List>
);

WithCustomColour.story = {
  name: "With custom colour"
};

export const WithCustomFontSizeAndLineHeight = () => (
  <List fontSize="small" lineHeight="smallTextBase">
    <ListItem>List Item 1</ListItem>
    <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
    <ListItem fontSize="large">Larger List Item 3</ListItem>
  </List>
);

WithCustomFontSizeAndLineHeight.story = {
  name: "With custom font size and line height"
};

export const WithCompactSpacing = () => (
  <List compact>
    <ListItem>List Item 1</ListItem>
    <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
    <ListItem>List Item 3</ListItem>
  </List>
);

WithCompactSpacing.story = {
  name: "With compact spacing"
};

export const WithLeftAlignment = () => (
  <List leftAlign>
    <ListItem>List Item 1</ListItem>
    <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
    <ListItem>List Item 3</ListItem>
  </List>
);

WithLeftAlignment.story = {
  name: "With left alignment"
};

export const WithSpace = () => (
  <List leftAlign mt="x5" p="x1">
    <ListItem>List Item 1</ListItem>
    <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
    <ListItem mt="x1">List Item 3</ListItem>
  </List>
);
