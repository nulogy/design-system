import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Link, IconicButton, List, ListItem,
} from "@nulogy/components";
import {
 Layout, Intro, DocSection, CheckList,
} from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Iconic Button</title>
    </Helmet>
    <Box pt="x4" mb="x6">
      <Title m="none">Iconic Button</Title>
      <Intro>A button that's an icon, with or without a label.</Intro>
    </Box>

    <DocSection>
      <IconicButton icon="delete" />
      <Highlight className="jsx">
        {`import { IconicButton } from @nulogy-components;

<IconicButton icon="delete" />
`}
      </Highlight>
    </DocSection>


    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <CheckList>When a possible action would best be communicated via iconography</CheckList>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>With a label</SubsectionTitle>
        <IconicButton icon="delete">Delete</IconicButton>
        <Highlight className="jsx">
          {"<IconicButton icon=\"delete\">Delete</IconicButton>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <IconicButton icon="delete" disabled>Delete</IconicButton>
        <Highlight className="jsx">
          {"<IconicButton icon=\"delete\" disabled>Delete</IconicButton>"}
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
            <td>Lightens the opacity and makes the button unable to be clicked.</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>String</td>
            <td><em>Required</em></td>
            <td>The icon to display. See <Link href="/components/icons">Icons</Link> for all possible options.</td>
          </tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem><Link href="/components/buttons">Buttons</Link></ListItem>
        <ListItem><Link href="/components/icons">Icons</Link></ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=IconicButton">View in Storybook</Link></ListItem>
    </DocSection>

  </Layout>
);
