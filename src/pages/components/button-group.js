/* eslint-disable quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button,
  PrimaryButton,
  ButtonGroup,
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Text
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "alignment",
    type: "String",
    defaultValue: "left",
    description:
      "Aligns the buttons within the group. One of left, spaced, or right."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the button group component"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Button Group</title>
    </Helmet>
    <Intro>
      <Title>Button Group</Title>
      <IntroText>
        Button Groups associate a set of related buttons together.
      </IntroText>
    </Intro>

    <DocSection>
      <ButtonGroup>
        <PrimaryButton>Button</PrimaryButton>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>
      <Highlight className="js">
        {`import { ButtonGroup, Button, PrimaryButton } from "@nulogy/components";

<ButtonGroup>
  <PrimaryButton>Button</PrimaryButton>
  <Button>Button</Button>
  <Button>Button</Button>
</ButtonGroup>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <List>
        <ListItem>
          Always use the Button Group component when there are multiple buttons
          beside each other.
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>

      <Box mb="x6">
        <SubsectionTitle>Right-aligned</SubsectionTitle>
        <Text mb="x2">
          Button alignment is set to right when grouping actions associated with
          pages, tables, lists, or records.
        </Text>
        <Box bg="whiteGrey" p="x2">
          <ButtonGroup alignment="right">
            <PrimaryButton>Button</PrimaryButton>
            <Button>Button</Button>
            <Button>Button</Button>
          </ButtonGroup>
        </Box>
        <Highlight className="js">
          {`import { ButtonGroup, Button, PrimaryButton } from "@nulogy/components";

<ButtonGroup alignment="right">
  <PrimaryButton>Button</PrimaryButton>
  <Button>Button</Button>
  <Button>Button</Button>
</ButtonGroup>
`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Spaced</SubsectionTitle>
        <Text mb="x2">
          Button alignment is set to spaced when dealing with multi-step flows
          with previous and next buttons.
        </Text>
        <Box bg="whiteGrey" p="x2">
          <ButtonGroup alignment="spaced">
            <Button>Previous</Button>
            <PrimaryButton>Next</PrimaryButton>
          </ButtonGroup>
        </Box>
        <Highlight className="js">
          {`import { ButtonGroup, Button, PrimaryButton } from "@nulogy/components";

<ButtonGroup alignment="spaced">
  <PrimaryButton>Button</PrimaryButton>
  <Button>Button</Button>
  <Button>Button</Button>
</ButtonGroup>
`}
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
          <Link href="/components/button">Button</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/iconic-button">Iconic button</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}buttongroup--buttongroup`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
