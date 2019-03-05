import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Toggle, Link,
} from "@nulogy/components";
import {
  DocText as Text, CheckList, Layout, Intro, DocSection,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Toggle</title>
    </Helmet>
    <Box mt="x2" mb="x6">
      <Title mb="none">Toggle</Title>
      <Intro>For quickly switching between two possible states.</Intro>
    </Box>
    <DocSection>
      <Toggle onText="On" offText="Off" />
      <Highlight className="jsx">
          {`import { Toggle } from @nulogy/components;

<Toggle onText="On" offText="Off" />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Toggle onText="On" offText="Off" disabled />
        <Highlight className="jsx">
          {`<Toggle onText="On" offText="Off" disabled />`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Toggled by default</SubsectionTitle>
        <Toggle onText="On" offText="Off" defaultToggled="true" />
        <Highlight className="jsx">
          {`<Toggle onText="On" offText="Off" defaultToggled="true" />`}
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
            <td>defaultToggled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Display the toggle as checked by default.</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Marks the toggle as disabled and disallows user input.</td>
          </tr>
          <tr>
            <td>offText</td>
            <td>String</td>
            <td>null</td>
            <td>A label for the toggle's off state.</td>
          </tr>
          <tr>
            <td>onText</td>
            <td>String</td>
            <td>null</td>
            <td>A label for the toggle's on state.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <Link href="https://storybook.nulogy.design/?selectedKind=Toggle">View in Storybook</Link>
    </DocSection>
  </Layout>
);
