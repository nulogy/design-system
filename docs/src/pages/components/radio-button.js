import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, Link, SectionTitle, SubsectionTitle, Title, Radio, ListItem,
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout, Intro, DocSection, PropsTable,
} from "../../components";
import radioProps from "../../shared/radioProps";

export default () => (
  <Layout>
    <Helmet>
      <title>Radio button</title>
    </Helmet>
    <Box mt="x2" mb="x6">
      <Title mb="none">Radio button</Title>
      <Intro>Radio buttons allow one selection from a group of options</Intro>
    </Box>
    <DocSection>
      <Radio id="radio" labelText="Radio button" />
      <Highlight className="js">
        {`import { Radio } from @nulogy/components;

<Radio id="radio" labelText="Radio button" />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <ListItem>Users need to make a single choice from a set of mutually exclusive options</ListItem>
      <ListItem>In place of a dropdown when it would be beneficial to see all items up front</ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Radio labelText="Radio button" disabled />
        <Highlight className="js">
          {"<Radio labelText=\"Radio button\" disabled />"}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Radio labelText="Radio button" error />
        <Highlight className="js">
          {"<Radio labelText=\"Radio button\" error />"}
        </Highlight>
      </Box>
      <Box>
        <SubsectionTitle>Checked</SubsectionTitle>
        <Radio labelText="Radio button" defaultChecked="true" />
        <Highlight className="js">
          {"<Radio labelText=\"Radio button\" defaultChecked=\"true\" />"}
        </Highlight>
      </Box>
    </DocSection>
    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <ListItem>Whenever possible use radio buttons for short lists (~ 5-7)</ListItem>
      <ListItem>Consider using a <Link href="/components/select">Select</Link> for long lists</ListItem>
      <ListItem>Users should be able to select the radio button by clicking on the box directly or by clicking on its label.</ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ radioProps } />
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Radio">View in storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
