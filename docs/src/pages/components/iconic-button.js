import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  IconicButton,
  List,
  ListItem
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "icon",
    type: "String",
    defaultValue: "Required",
    description:
      "The icon to display. See the Icons component for all possible options."
  },
  {
    name: "labelHidden",
    type: "Boolean",
    defaultValue: "false",
    description:
      "Will display the label under the Iconic Button on hover or button focus."
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description:
      "Lightens the opacity and makes the button unable to be clicked."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Iconic Button</title>
    </Helmet>
    <Intro>
      <Title>Iconic Button</Title>
      <IntroText>A button that's an icon, with or without a label.</IntroText>
    </Intro>

    <DocSection>
      <IconicButton icon="delete" />
      <Highlight className="js">
        {`import { IconicButton } from "@nulogy/components";

<IconicButton icon="delete" />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <ListItem>
        When a possible action would best be communicated via iconography
      </ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>With a label</SubsectionTitle>
        <IconicButton icon="delete">Delete</IconicButton>
        <Highlight className="js">
          {'<IconicButton icon="delete">Delete</IconicButton>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>With a hidden label</SubsectionTitle>
        <IconicButton labelHidden icon="delete">
          Delete
        </IconicButton>
        <Highlight className="js">
          {'<IconicButton labelHidden icon="delete">Delete</IconicButton>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <IconicButton icon="delete" disabled>
          Delete
        </IconicButton>
        <Highlight className="js">
          {'<IconicButton icon="delete" disabled>Delete</IconicButton>'}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/buttons">Buttons</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/icon">Icons</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem>
        <Link href="https://storybook.nulogy.design/?path=/story/iconicbutton--with-label">
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
