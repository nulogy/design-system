import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, SectionTitle, SubsectionTitle, Title, Checkbox, Link,
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout, Intro, DocSection, CheckList,
} from "../../components";

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
      <Checkbox labelText="I am a checkbox" />
      <Highlight className="jsx">
        {`import { Checkbox } from @nulogy-components;

<Checkbox labelText="I am a checkbox" />
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>

      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Checkbox labelText="I am a checkbox" disabled />
        <Highlight className="jsx">
          {"<Checkbox labelText=\"I am a checkbox\" disabled />"}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Checkbox labelText="I am a checkbox" error />
        <Highlight className="jsx">
          {"<Checkbox labelText=\"I am a checkbox\" error />"}
        </Highlight>
      </Box>

      <Box>
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Checkbox labelText="I am a checkbox" defaultChecked="true" />
        <Highlight className="jsx">
          {"<Checkbox labelText=\"I am a checkbox\" defaultChecked=\"true\"/>"}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <CheckList>If there are many items in a list, consider using a "Show all" button</CheckList>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <table>
        <thead>
          <tr>
            <td>Prop</td>
            <td>Type</td>
            <td>Default value</td>
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
            <td>Marks the field as invalid and adds a red border</td>
          </tr>
          <tr>
            <td>labelText</td>
            <td>String</td>
            <td><em>Required</em></td>
            <td>A label for your option</td>
          </tr>
          <tr>
            <td>onChange</td>
            <td>Function</td>
            <td />
            <td />
          </tr>
          <tr>
            <td>required</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Makes the field require input before the form will submit</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <Link href="https://storybook.nulogy.design/?selectedKind=Checkbox">View in Storybook</Link>
    </DocSection>
  </Layout>
);
