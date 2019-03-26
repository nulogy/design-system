import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, List, ListItem,
} from "@nulogy/components";
import {
  Layout, Intro, IntroText, DocSection,
} from "../../components";

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
        {`import {List, ListItem} from @nulogy/components;

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
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <table>
        <thead>
          <tr>
            <td>Prop</td>
            <td>Type</td>
            <td>Default</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>compact</td>
            <td>Boolean</td>
            <td>False</td>
            <td>Removes margin between list items</td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=List">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
