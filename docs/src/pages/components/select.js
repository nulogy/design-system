import React from "react";
import { Helmet } from "react-helmet";
import {
  Box, SectionTitle, Title, Select, Link, ListItem,
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout, Intro, DocSection,
} from "../../components";

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
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
error="Please select an inventory status" />`}
      </Highlight>

    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <table>
        <thead>
          <tr>
            <td>Prop</td>
            <td>Type</td>
            <td>Default</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>placeholder</td>
            <td>String</td>
            <td>""</td>
            <td>A description of what the Select box contains</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Marks the field as disabled and disallows user input</td>
          </tr>
          <tr>
            <td>helpText</td>
            <td>String</td>
            <td>""</td>
            <td>Additional information to display beneath the label.</td>
          </tr>
          <tr>
            <td>name</td>
            <td>String</td>
            <td>Required</td>
            <td>A unique ID for this input</td>
          </tr>
          <tr>
            <td>options</td>
            <td>Array of objects</td>
            <td>Required</td>
            <td>The options available to be selected, containing a value and a label</td>
          </tr>
          <tr>
            <td>error</td>
            <td>String</td>
            <td>null</td>
            <td>Text to display inside validation. If used, field will be marked as invalid and have a red border.</td>
          </tr>
          <tr>
            <td>required</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Makes the field require input before the form will submit</td>
          </tr>
        </tbody>
      </table>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Select">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
