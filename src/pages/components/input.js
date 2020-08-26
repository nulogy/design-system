import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Input,
  Link,
  ListItem,
  List
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import inputProps from "../../shared/inputProps";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const prefixSuffixProps = [
  {
    name: "prefix",
    type: "String",
    defaultValue: "null",
    description: "Displays input field prefix label"
  },
  {
    name: "prefixWidth",
    type: "String",
    defaultValue: "null",
    description: "Controls the width of prefix label"
  },
  {
    name: "prefixAlignment",
    type: "String",
    defaultValue: "left",
    description:
      "Aligns prefix label text. Accepts left, center, and right value."
  },
  {
    name: "suffix",
    type: "String",
    defaultValue: "null",
    description: "Displays input field suffix label"
  },
  {
    name: "suffixWidth",
    type: "String",
    defaultValue: "null",
    description: "Controls the width of suffix label"
  },
  {
    name: "suffixAlignment",
    type: "String",
    defaultValue: "left",
    description:
      "Aligns suffix label text. Accepts left, center, and right value."
  }
];

const propsRows = [
  {
    name: "value",
    type: "String",
    defaultValue: "undefined",
    description: "Value of input, used when controlling the component"
  },
  {
    name: "defaultValue",
    type: "String",
    defaultValue: "",
    description: "Default value of input"
  },
  ...inputProps,
  ...prefixSuffixProps
];

export default () => (
  <Layout>
    <Helmet>
      <title>Input</title>
    </Helmet>
    <Intro>
      <Title>Input</Title>
      <IntroText>An input field that users can type into.</IntroText>
    </Intro>
    <DocSection>
      <Input id="input" labelText="Label" />
      <Highlight className="js">
        {`import { Input } from "@nulogy/components";

<Input id="input" labelText="Input label" />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <List>
        <ListItem>
          Users need to enter information that is best communicated in text
          form.
        </ListItem>
        <ListItem>
          You need to collect information that varies from one user to another
          and can’t be represented as a set of pre-determined choices.
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Input labelText="Label" placeholder="I'm an input" disabled />
        <Highlight className="js">
          {'<Input id="disabled-input" placeholder="I\'m an input" disabled />'}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Input labelText="Label" errorMessage="Error message" />
        <Highlight className="js">
          {
            '<Input labelText="Label" id="error-input" errorMessage="Error message" />'
          }
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With all labels</SubsectionTitle>
        <Input
          id="all-labels"
          labelText="Label"
          helpText="Additional help text"
          requirementText="(Optional)"
          placeholder="I'm an input"
        />
        <Highlight className="js">
          {`<Input
  id="all-labels"
  labelText="Label"
  helpText="Additional help text"
  requirementText="(Optional)"
  placeholder="I'm an input"
/>`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With Prefix and Suffix</SubsectionTitle>
        <Input
          id="all-labels"
          labelText="Label"
          placeholder="I'm an input"
          prefix="I'm prefix label"
          suffix="I'm suffix label"
        />
        <Highlight className="js">
          {`<Input
  id="all-labels"
  labelText="Label"
  placeholder="I'm an input"
  prefix="I'm prefix label"
  suffix="I'm sufix label"
/>`}
        </Highlight>
      </Box>
    </DocSection>
    <DocSection>
      <SectionTitle>Guidelines</SectionTitle>
      <List>
        <ListItem>
          Whenever possible match the width of the input field with the expected
          length of the input. If that is not possible then fill the entire
          width of the container.
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/form">Form</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}input--input`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
