import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Select,
  Link,
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
import inputProps from "../../shared/inputProps";

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" }
];

const propsRows = [
  {
    name: "autocomplete",
    type: "Boolean",
    defaultValue: "true",
    description: "Whether or not typing will filter the options list"
  },
  {
    name: "options",
    type: "Array",
    defaultValue: "Required",
    description:
      "The options available to be selected, containing a value and a label"
  },
  {
    name: "maxHeight",
    type: "String",
    defaultValue: "256px",
    description: "Max height of the select dropdown menu, content is scrollable"
  },
  {
    name: "multiselect",
    type: "Boolean",
    defaultValue: "false",
    description: "Whether or not multiple selections can be made"
  },
  {
    name: "value",
    type: "String | Array",
    defaultValue: "undefined",
    description: "Value of input, used when controlling the component"
  },
  {
    name: "defaultValue",
    type: "String | Array",
    defaultValue: "",
    description: "Default value of input"
  },
  {
    name: "menuIsOpen",
    type: "Boolean",
    defaultValue: "undefined",
    description:
      "Controls whether the menu is open; If unset, then NDS controls this implicitly instead"
  },
  {
    name: "onMenuOpen",
    type: "Function",
    defaultValue: "undefined",
    description: "Event handler for when the menu is opened"
  },
  {
    name: "onMenuClose",
    type: "Function",
    defaultValue: "undefined",
    description: "Event handler for when the menu is closed"
  },
  ...inputProps
];

export default () => (
  <Layout>
    <Helmet>
      <title>Select</title>
    </Helmet>
    <Intro>
      <Title>Select</Title>
      <IntroText>
        For making one selection from a large list of options.
      </IntroText>
    </Intro>
    <DocSection>
      <Select
        options={options}
        labelText="Inventory status"
        id="inventory-status"
      />
      <Highlight className="js">
        {`import { Select } from "@nulogy/components";

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
];

<Select
  options={ options }
  id="inventory-status"
  labelText="Inventory status"
/>`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <List>
        <ListItem>
          Users need to choose a single option from a list of mutually exclusive
          options.
        </ListItem>
        <ListItem>
          There is a large data set that would be impractical for radio buttons
          or a toggle.
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Select
          labelText="Label"
          placeholder="Please select inventory status"
          options={options}
          id="disabled"
          disabled
        />
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
        <Select
          options={options}
          id="error"
          errorMessage="Please select an inventory status"
        />
        <Highlight className="js">
          {`<Select
  options={ options }
  id="error"
  errorMessage="Please select an inventory status"
/>`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Multiselect</SubsectionTitle>
        <Select options={options} id="multiselect" multiselect />
        <Highlight className="js">
          {`<Select
  options={ options }
  id="multiselect"
  multiselect
/>`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With all labels</SubsectionTitle>
        <Select
          labelText="Label"
          requirementText="(Optional)"
          helpText="Additional help text"
          placeholder="Please select inventory status"
          options={options}
          id="all-label"
        />
        <Highlight className="js">
          {`<Select
  labelText="Label"
  requirementText="(Optional)"
  helpText="Additional help text"
  placeholder="Please select inventory status"
  options={ options }
  id="all-labels"
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
          <Link href="https://storybook.nulogy.design/?path=/story/select--select">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
