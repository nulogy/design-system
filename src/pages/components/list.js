import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "compact",
    type: "Boolean",
    defaultValue: "false",
    description: "Removes margin between list items"
  },
  {
    name: "leftAlign",
    type: "Boolean",
    defaultValue: "false",
    description: "Sets padding left to align to left of container"
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the list component."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>List</title>
    </Helmet>
    <Intro>
      <Title>List</Title>
      <IntroText>A standard list, available in two sizes.</IntroText>
    </Intro>

    <DocSection>
      <List mb="x3">
        <ListItem>List item</ListItem>
        <ListItem>List item</ListItem>
        <ListItem>List item</ListItem>
      </List>
      <Highlight className="js">
        {`import {List, ListItem} from "@nulogy/components";

<List>
  <ListItem>List item</ListItem>
  <ListItem>List item</ListItem>
  <ListItem>List item</ListItem>
</List>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Compact</SubsectionTitle>
        <List mb="x3" compact>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
        </List>
        <Highlight className="js">
          {`<List compact>
  <ListItem>List item</ListItem>
  <ListItem>List item</ListItem>
  <ListItem>List item</ListItem>
</List>`}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>LeftAlign</SubsectionTitle>
        <List mb="x3" leftAlign>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
        </List>
        <Highlight className="js">
          {`<List leftAlign>
  <ListItem>List item</ListItem>
  <ListItem>List item</ListItem>
  <ListItem>List item</ListItem>
</List>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem>
        <Link href={`${STORYBOOK_COMPONENT_URL}list--list`}>
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
