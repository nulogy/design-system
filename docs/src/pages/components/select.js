import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, SectionTitle, Title, Select, Link, ListItem,
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout, Intro, DocSection, PropsTable,
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
    <Box
      bg="" mt="x2"
      mb="x6"
    >
      <Title mb="none">Select</Title>
      <Intro>For making one selection from a large list of options.</Intro>
    </Box>
    <DocSection>

      <Select placeholder="Please select inventory status" options={ options } labelText="Inventory status" name="inventory-status" />
      <Highlight className="js">
        {`import { Select } from @nulogy/components;

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
];

<Select
  placeholder="Please select inventory status"
  options={ options }
  name="inventory-status"
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
      <Box mb="x3">
        <Select labelText="Disabled" placeholder="Please select inventory status" options={ options } name="disabled" disabled />
        <Highlight className="js">
          {`<Select
  labelText="Disabled"
  placeholder="Please select inventory status"
  options={ options }
  name="disabled"
  disabled
/>`}
        </Highlight>
      </Box>

      <Select labelText="Error" placeholder="Please select inventory status" options={ options } name="error" error="Please select an inventory status" />
      <Highlight className="js">
        {`<Select
  labelText="Error"
  placeholder="Please select inventory status"
  options={ options }
  name="error"
  error="Please select an inventory status"
/>`}
      </Highlight>

    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ propsRows } />
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Select">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
