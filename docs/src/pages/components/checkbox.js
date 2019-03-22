import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, SectionTitle, SubsectionTitle, Title, Checkbox, Link, ListItem,
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout, Intro, DocSection, PropsTable,
} from "../../components";
import radioProps from "../../shared/radioProps";

export default () => (
  <Layout>
    <Helmet>
      <title>Checkbox</title>
    </Helmet>
    <Box mt="x2" mb="x6">
      <Title mb="none">Checkbox</Title>
      <Intro>Checkboxes allow users to select any number of options from a list.</Intro>
    </Box>
    <DocSection>
      <Checkbox id="checkbox" labelText="I am a checkbox" />
      <Highlight className="js">
        {`import { Checkbox } from @nulogy/components;

<Checkbox id="checkbox" labelText="I am a checkbox" />
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>

      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Checkbox labelText="I am a checkbox" disabled />
        <Highlight className="js">
          {"<Checkbox id=\"disabled-checkbox\" labelText=\"I am a checkbox\" disabled />"}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Checkbox labelText="I am a checkbox" error />
        <Highlight className="js">
          {"<Checkbox id=\"error-checkbox\" labelText=\"I am a checkbox\" error />"}
        </Highlight>
      </Box>

      <Box>
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Checkbox labelText="I am a checkbox" defaultChecked="true" />
        <Highlight className="js">
          {"<Checkbox id=\"disabled-checkbox\" labelText=\"I am a checkbox\" defaultChecked=\"true\"/>"}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <ListItem>Add labels, errors and default selections with <Link href="/components/checkbox-group">Checkbox Group</Link></ListItem>
      <ListItem>If there are many items in a list, consider using a "Show all" button</ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ radioProps } />
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Checkbox">View in Storybook</Link></ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/checkbox-group">Checkbox Group</Link></ListItem>
    </DocSection>
  </Layout>
);
