import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Text,
  Title,
  SectionTitle,
  SubsectionTitle,
} from "ComponentsRoot";

storiesOf("Headings", module)
  .add("Title", () => (
    <Title>Title</Title>
  ))
  .add("Section Title", () => (
    <SectionTitle>Section Title</SectionTitle>
  ))
  .add("Subsection Title", () => (
    <SubsectionTitle>SubsectionTitle</SubsectionTitle>
  ))
  .add("With a custom margin", () => (
    <React.Fragment>
      <Title mb="x6">Title</Title>
      <Text>Lorem ipsum</Text>
    </React.Fragment>
  ));
