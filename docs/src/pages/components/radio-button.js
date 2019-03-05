import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, Link, SectionTitle, SubsectionTitle, Title, Radio,
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout, Intro, DocSection, CheckList,
} from "../../components";

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
      <Radio labelText="Radio button" />
      <Highlight className="jsx">
        {`import { Radio } from @nulogy-components;

<Radio labelText="Radio button" />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <CheckList>Users need to make a single choice from a set of mutually exclusive options</CheckList>
      <CheckList>In place of a dropdown when it would be beneficial to see all items up front</CheckList>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Radio labelText="Radio button" disabled />
        <Highlight className="jsx">
          {"<Radio labelText=\"Radio button\" disabled />"}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Radio labelText="Radio button" error />
        <Highlight className="jsx">
          {"<Radio labelText=\"Radio button\" error />"}
        </Highlight>
      </Box>
      <Box>
        <SubsectionTitle>Checked</SubsectionTitle>
        <Radio labelText="Radio button" defaultChecked="true" />
        <Highlight className="jsx">
          {"<Radio labelText=\"Radio button\" defaultChecked=\"true\" />"}
        </Highlight>
      </Box>
    </DocSection>
    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <CheckList>Whenever possible use radio buttons for short lists (~ 5-7)</CheckList>
      <CheckList>Consider using a <Link href="/components/select">Select</Link> for long lists</CheckList>
      <CheckList>Users should be able to select the radio button by clicking on the box directly or by clicking on its label.</CheckList>
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
            <td>defaultChecked</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Makes the field checked by default</td>
          </tr>
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
            <td>labelText</td>
            <td>String</td>
            <td><em>Required</em></td>
            <td>A label for your option</td>
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
      <Link href="https://storybook.nulogy.design/?selectedKind=Radio">View in storybook</Link>
    </DocSection>
  </Layout>
);
