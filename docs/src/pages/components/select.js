import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, SectionTitle, SubsectionTitle, Title, Select, Link, ListItem, List
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout, Intro, IntroText, DocSection, PropsTable,
} from "../../components";
import inputProps from "../../shared/inputProps";

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
];

const propsRows = [
  {
    name: "options", type: "Array", defaultValue: "Required", description: "The options available to be selected, containing a value and a label",
  },
  ...inputProps,
];

export default () => (
  <Layout>
    <Helmet>
      <title>Select</title>
    </Helmet>
    <Intro>
      <Title>Select</Title>
      <IntroText>For making one selection from a large list of options.</IntroText>
    </Intro>
    <DocSection>

      <Select options={ options } labelText="Inventory status" id="inventory-status" />
      <Highlight className="js">
        {`import { Select } from @nulogy/components;

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
];

<Select
  options={ options }
  id="inventory-status"
  labelText="Inventory status"
/>`
}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <ListItem>Users need to choose a single option from a list of mutually exclusive options.</ListItem>
      <ListItem>There is a large data set that would be impractical for radio buttons or a toggle.</ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Select labelText="Label" placeholder="Please select inventory status" options={ options } id="disabled" disabled />
        <Highlight className="js">
          {`<Select
  labelText="Label"
  placeholder="Please select inventory status"
  options={ options }
  id="disabled"
  disabled
/>`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Error</SubsectionTitle>
        <Select options={ options } id="error" error="Please select an inventory status" />
        <Highlight className="js">
          {`<Select
    options={ options }
    id="error"
    error="Please select an inventory status"
  />`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With all labels</SubsectionTitle>
        <Select labelText="Label" requirementText="(Optional)" helpText="Additional help text" placeholder="Please select inventory status" options={ options } id="all-label" />
        <Highlight className="js">
          {`<Select
    labelText="Label"
    requirementText="(Optional)"
    helpText="Additional help text"
    placeholder="Please select inventory status"
    options={ options }
    id="all-label"
  />`}
        </Highlight>
      </Box>

    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ propsRows } />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem><Link href="/components/form">Form</Link></ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Select">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
