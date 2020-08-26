import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Link,
  SectionTitle,
  SubsectionTitle,
  Title,
  Radio,
  ListItem,
  List
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import radioAndCheckboxProps from "../../shared/radioAndCheckboxProps";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const radioProps = [
  ...radioAndCheckboxProps,
  {
    name: "checked",
    type: "boolean",
    defaultValue: "undefined",
    description:
      "Whether or not this radio button is the currently selected item in the group"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Radio</title>
    </Helmet>
    <Intro>
      <Title>Radio</Title>
      <IntroText>
        Radio buttons allow one selection from a group of options
      </IntroText>
    </Intro>
    <DocSection>
      <Radio id="radio" labelText="Radio button" />
      <Highlight className="js">
        {`import { Radio } from "@nulogy/components";

<Radio id="radio" labelText="Radio button" />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <List>
        <ListItem>
          Users need to make a single choice from a set of mutually exclusive
          options
        </ListItem>
        <ListItem>
          In place of a dropdown when it would be beneficial to see all items up
          front
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Radio id="disabled-radio" labelText="Radio button" disabled />
        <Highlight className="js">
          {'<Radio id="disabled-radio" labelText="Radio button" disabled />'}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Radio id="error-radio" labelText="Radio button" error />
        <Highlight className="js">
          {'<Radio id="error-radio" labelText="Radio button" error />'}
        </Highlight>
      </Box>
      <Box>
        <SubsectionTitle>Checked</SubsectionTitle>
        <Radio
          id="checked-radio"
          labelText="Radio button"
          defaultChecked="true"
        />
        <Highlight className="js">
          {
            '<Radio id="checked-radio" labelText="Radio button" defaultChecked="true" />'
          }
        </Highlight>
      </Box>
    </DocSection>
    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <List>
        <ListItem>
          Whenever possible use radio buttons for short lists (~ 5-7)
        </ListItem>
        <ListItem>
          Add labels, errors and default selections with{" "}
          <Link href="/components/radio-group">Radio Group</Link>
        </ListItem>
        <ListItem>
          Consider using a <Link href="/components/select">Select</Link> for
          long lists
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={radioProps} />
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/radio-group">Radio group</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/form">Form</Link>
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}radio--radio`}>
            View in storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
