import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  ListItem,
  Textarea,
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

const propsRows = [
  {
    name: "rows",
    type: "Number",
    defaultValue: "3",
    description: "A custom number of rows to show by default."
  },
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
  ...inputProps
];

export default () => (
  <Layout>
    <Helmet>
      <title>Textarea</title>
    </Helmet>
    <Intro>
      <Title>Textarea</Title>
      <IntroText>A multiline text input field.</IntroText>
    </Intro>

    <DocSection>
      <Textarea labelText="Label" id="textarea" />
      <Highlight className="js">
        {`import { Textarea } from "@nulogy/components";

<Textarea labelText="Label" id="textarea" />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <List>
        <ListItem>Users need to enter multiple lines of text.</ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Custom size</SubsectionTitle>
        <Textarea id="custom-size" labelText="Label" rows={2} />
        <Highlight className="js">
          {'<Textarea id="custom-size" labelText="Label" rows={2} />'}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Textarea id="disabled" labelText="Label" disabled />
        <Highlight className="js">
          {'<Textarea id="disabled" labelText="Label" disabled />'}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Textarea
          id="error"
          labelText="Label"
          errorMessage="Please fill this out"
        />
        <Highlight className="js">
          {
            '<Textarea id="error" labelText="Label" errorMessage="Please fill this out" />'
          }
        </Highlight>
      </Box>
      <Box>
        <SubsectionTitle>With all labels</SubsectionTitle>
        <Textarea
          id="all-labels"
          labelText="Label"
          helpText="Additional help text"
          requirementText="(Optional)"
          placeholder="Placeholder"
        />
        <Highlight className="js">
          {`<Textarea
  id="all-labels"
  labelText="Label"
  helpText="Additional help text"
  requirementText="(Optional)"
  placeholder="Placeholder"
/>`}
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
          <Link href="/components/form">Form</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/textarea--textarea">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
