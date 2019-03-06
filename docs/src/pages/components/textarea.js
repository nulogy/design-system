import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, ListItem, Textarea,
} from "@nulogy/components";
import {
  Layout, Intro, DocSection, CheckList,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Textarea</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Textarea</Title>
      <Intro>A multiline text input field.</Intro>
    </Box>

    <DocSection>
      <Textarea />
      <Highlight className="jsx">
        {`import { Textarea } from @nulogy-components;

<Textarea />
`}
      </Highlight>
    </DocSection>


    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <CheckList>Users need to enter multiple lines of text.</CheckList>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Custom size</SubsectionTitle>
        <Textarea rows={ 2 } />
        <Highlight className="jsx">
          {"<Textarea rows={2} />"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Textarea disabled />
        <Highlight className="jsx">
          {"<Textarea disabled />"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Error</SubsectionTitle>
        <Textarea error />
        <Highlight className="jsx">
          {"<Textarea error />"}
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
            <td>rows</td>
            <td>Number</td>
            <td>3</td>
            <td>Marks the field as invalid and turns red</td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Textarea">View in Storybook</Link></ListItem>
    </DocSection>

  </Layout>
);
