import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box, SectionTitle, SubsectionTitle, Title, Toggle, Link, List
} from "@nulogy/components";
import {
  Layout, Intro, IntroText, DocSection, PropsTable,
} from "../../components";

const togglePropsRows = [
  {
    name: "defaultToggled", type: "Boolean", defaultValue: "false", description: "Display the toggle as checked by default.",
  },
  {
    name: "disabled", type: "Boolean", defaultValue: "false", description: "Marks the toggle as disabled and disallows user input.",
  },
  {
    name: "id", type: "String", defaultValue: "Required", description: "A unique ID for this input",
  },
  {
    name: "labelText", type: "String", defaultValue: "null", description: "Label for the input",
  },
  {
    name: "offText", type: "String", defaultValue: "false", description: "A label for the toggle's off state.",
  },
  {
    name: "onText", type: "String", defaultValue: "false", description: "A label for the toggle's on state.",
  },
  {
    name: "onChange", type: "Function", defaultValue: "null", description: "",
  },
  {
    name: "required", type: "Boolean", defaultValue: "false", description: "Makes the field require input before the form will submit",
  },
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
        {`import { Toggle } from @nulogy/components;

<Toggle id="toggle" labelText="Label" onText="On" offText="Off" />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Toggle id="disabled-toggle" onText="On" offText="Off" disabled />
        <Highlight className="js">
          {"<Toggle id=\"disabled-toggle\" onText=\"On\" offText=\"Off\" disabled />"}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Toggled by default</SubsectionTitle>
        <Toggle id="toggled-toggle" onText="On" offText="Off" defaultToggled="true" />
        <Highlight className="js">
          {"<Toggle id=\"toggled-toggle\" onText=\"On\" offText=\"Off\" defaultToggled=\"true\" />"}
        </Highlight>
      </Box>
      <Box>
        <SubsectionTitle>With all labels</SubsectionTitle>
        <Toggle id="toggle-with-labels" labelText="Toggle" helpText="Turns setting on/off" onText="On" offText="Off" defaultToggled required requirementText="(Required)" />
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
      <PropsTable propsRows={ togglePropsRows } />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem><Link href="/components/form">Form</Link></ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <Link href="https://storybook.nulogy.design/?selectedKind=Toggle">View in Storybook</Link>
    </DocSection>
  </Layout>
);
