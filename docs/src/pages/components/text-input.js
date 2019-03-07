import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Input, Link, ListItem,
} from "@nulogy/components";
import {
  Layout, Intro, DocSection,
} from "../../components";

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
      <Input placeholder="I'm an input" />
      <Highlight className="js">
        {`import { Input } from @nulogy/components;

<Input placeholder="I'm an input" />`}
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
          {"<Input placeholder=\"I'm an input\" disabled />"}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Input placeholder="I'm an input" error />
        <Highlight className="js">
          {"<Input error />"}
        </Highlight>
      </Box>
    </DocSection>
    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <ListItem>Whenever possible match the width of the input field with the expected length of the input. If that is not possible then fill the entire width of the container.</ListItem>
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
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Marks the field as disabled and disallows user input</td>
          </tr>
          <tr>
            <td>error</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Marks the field as invalid and turns red</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>String</td>
            <td>null</td>
            <td>A hint to the expected format for the field. Not a replacement for a label.</td>
          </tr>
          <tr>
            <td>required</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Makes the field require selection before the form will submit</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Input">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
