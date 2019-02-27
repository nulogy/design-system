import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button, Box, Flex, SectionTitle, SubsectionTitle, Title, Link,
} from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, DocSection, CheckList,
} from "../../components";


export default () => (
  <Layout>
    <Helmet>
      <title>Component name</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Component name</Title>
      <Intro>A short description of the component.</Intro>
      </Box>

      <DocSection>
      <Button>Create project</Button>
      <Highlight className="jsx">
        {`import {Button} from @nulogy-components;

<Button>Create project</Button>
`}
      </Highlight>
      </DocSection>


    <DocSection>
      <SectionTitle>When to use</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Variation 1</SubsectionTitle>
        <Highlight className="jsx">
        {``}
      </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Dos and Donts</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Accessibility guidelines</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive information</SectionTitle>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
    </DocSection>

  </Layout>
);
