import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Input, Link, ListItem,
} from "@nulogy/components";
import {
  Layout, Intro, DocSection, PropsTable,
} from "../../components";
import inputProps from "../../shared/inputProps";

export default () => (
  <Layout>
    <Helmet>
      <title>Text input</title>
    </Helmet>
    <Box mt="x2" mb="x6">
      <Title mb="none">Text input</Title>
      <Intro>An input field that users can type into.</Intro>
    </Box>
    <DocSection>
      <Input id="input" labelText="Input label" placeholder="I'm an input" />
      <Highlight className="js">
        {`import { Input } from @nulogy/components;

<Input id="input" labelText="Input label" placeholder="I'm an input" />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <ListItem>Users need to enter information that is best communicated in text form.</ListItem>
      <ListItem>You need to collect information that varies from one user to another and can’t be represented as a set of pre-determined choices.</ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Input placeholder="I'm an input" disabled />
        <Highlight className="js">
          {"<Input id=\"disabled-input\" placeholder=\"I'm an input\" disabled />"}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Input labelText="Label" placeholder="I'm an input" error="Error message" />
        <Highlight className="js">
          {"<Input labelText=\"Label\" id=\"error-input\" error=\"Error message\" />"}
        </Highlight>
      </Box>
    </DocSection>
    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <ListItem>Whenever possible match the width of the input field with the expected length of the input. If that is not possible then fill the entire width of the container.</ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ inputProps } />
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Input">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
