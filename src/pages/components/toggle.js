import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Toggle,
  Link,
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
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const togglePropsRows = [
  {
    name: "defaultToggled",
    type: "Boolean",
    defaultValue: "false",
    description: "Display the toggle as checked by default."
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "Marks the toggle as disabled and disallows user input."
  },
  {
    name: "id",
    type: "String",
    defaultValue: "null",
    description: "A unique ID for this input."
  },
  {
    name: "value",
    type: "String",
    defaultValue: "on",
    description: "Value on the input that can be submitted."
  },
  {
    name: "helpText",
    type: "String",
    defaultValue: "null",
    description:
      "Placed below the label to provide assistance on how to fill out a field or the expected format. It can also provide an explanation of why the information is needed and how it will be used."
  },
  {
    name: "labelText",
    type: "String",
    defaultValue: "null",
    description: "Informs users what the corresponding input field is for."
  },
  {
    name: "offText",
    type: "String",
    defaultValue: "false",
    description: "A label for the toggle's off state."
  },
  {
    name: "onText",
    type: "String",
    defaultValue: "false",
    description: "A label for the toggle's on state."
  },
  {
    name: "toggled",
    type: "Boolean",
    defaultValue: "undefined",
    description: "The value of the toggle when using as a controlled component."
  },
  {
    name: "onChange",
    type: "Function",
    defaultValue: "null",
    description:
      "Function that triggers when toggle is clicked, use with the toggled prop for a controlled component."
  },
  {
    name: "required",
    type: "Boolean",
    defaultValue: "false",
    description: "Makes the field require input before the form will submit."
  },
  {
    name: "requirementText",
    type: "String",
    defaultValue: "null",
    description: "(Optional) or (Required)."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the container element."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Toggle</title>
    </Helmet>
    <Intro>
      <Title>Toggle</Title>
      <IntroText>For quickly switching between two possible states.</IntroText>
    </Intro>
    <DocSection>
      <Toggle id="toggle" labelText="Label" onText="On" offText="Off" />
      <Highlight className="js">
        {`import { Toggle } from "@nulogy/components";

<Toggle id="toggle" labelText="Label" onText="On" offText="Off" />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Toggle id="disabled-toggle" onText="On" offText="Off" disabled />
        <Highlight className="js">
          {'<Toggle id="disabled-toggle" onText="On" offText="Off" disabled />'}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Toggled by default</SubsectionTitle>
        <Toggle
          id="toggled-toggle"
          onText="On"
          offText="Off"
          defaultToggled="true"
        />
        <Highlight className="js">
          {
            '<Toggle id="toggled-toggle" onText="On" offText="Off" defaultToggled="true" />'
          }
        </Highlight>
      </Box>
      <Box>
        <SubsectionTitle>With all labels</SubsectionTitle>
        <Toggle
          id="toggle-with-labels"
          labelText="Toggle"
          helpText="Turns setting on/off"
          onText="On"
          offText="Off"
          defaultToggled
          required
          requirementText="(Required)"
        />
        <Highlight className="js">
          {`<Toggle id="toggle-with-labels"
  labelText="Toggle"
  helpText="Turns setting on/off"
  onText="On"
  offText="Off"
  requirementText="(Optional)"
/>`}
        </Highlight>
      </Box>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={togglePropsRows} />
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
          <Link href={`${STORYBOOK_COMPONENT_URL}toggle--toggle`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
