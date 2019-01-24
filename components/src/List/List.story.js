import React from "react";
import { storiesOf } from "@storybook/react";
import List from "./List";
import ListItem from "./ListItem";
import theme from "../theme.js";

storiesOf("List", module)
  .add("List", () => (
    <React.Fragment>
      <List>
        <ListItem>List Item 1</ListItem>
        <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
        <ListItem>List Item 3</ListItem>
      </List>
    </React.Fragment>
  ))
  .add("With custom colour", () => (
    <React.Fragment>
      <List color='red'>
        <ListItem>List Item 1</ListItem>
        <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
        <ListItem>List Item 3</ListItem>
      </List>
    </React.Fragment>
  ))
  .add("With custom font size and line height", () => (
    <React.Fragment>
      <List fontSize={ 0 } lineHeight='smallTextBase'>
        <ListItem>List Item 1</ListItem>
        <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
        <ListItem>List Item 3</ListItem>
      </List>
    </React.Fragment>
  ))
  .add("With compact spacing", () => (
    <React.Fragment>
      <List compact>
        <ListItem>List Item 1</ListItem>
        <ListItem>List Item 2 that is really really really really really really really really really long</ListItem>
        <ListItem>List Item 3</ListItem>
      </List>
    </React.Fragment>
  ));
