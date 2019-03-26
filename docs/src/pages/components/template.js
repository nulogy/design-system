/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button, Box, SectionTitle, SubsectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import {
   Layout, Intro, IntroText, DocSection,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Component name</title>
    </Helmet>
    <Intro>
      <Title>Component name</Title>
      <IntroText>A short description of the component.</IntroText>
    </Intro>

    <DocSection>
      <Button>Create project</Button>
      <Highlight className="js">
        {`import {Button} from @nulogy/components;

<Button>Create project</Button>
`}
      </Highlight>
    </DocSection>


    <DocSection>
      <SectionTitle>Use when</SectionTitle>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Variation 1</SubsectionTitle>
        <Highlight className="js">
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
            <td>Default</td>
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
      <ListItem><Link href="https://storybook.nulogy.design/selectedKind=">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
