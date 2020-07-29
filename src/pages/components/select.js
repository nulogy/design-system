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
  List,
  Table,
  Text,
  SelectOption
} from "@nulogy/components";
import styled from "styled-components";
import Highlight from "react-highlight";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable,
  InlineCode
} from "../../components";
import selectProps from "../../shared/selectProps";

const options = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" }
];

const customSelectComponents = [
  {
    keyName: "Option",
    import: "SelectOption",
    description: "Individual options in the select's dropdown"
  },
  {
    keyName: "Control",
    import: "Control",
    description: "Wraps the select field"
  },
  {
    keyName: "MultiValue",
    import: "SelectMultiValue",
    description: "The selected options in a muliselect select"
  },
  {
    keyName: "ClearIndicator",
    import: "SelectClearIndicator",
    description: "The clear button in the multiselect"
  },
  {
    keyName: "SelectContainer",
    import: "SelectContainer",
    description: "The wrapper around the whole field and dropdown"
  },
  {
    keyName: "Menu",
    import: "SelectMenu",
    description: "The wrapper around the dropdown options"
  },
  {
    keyName: "Input",
    import: "SelectInput",
    description: "The typeable input in the select"
  }
];

const propsRows = [
  ...selectProps,
  {
    name: "windowThreshold",
    type: "number",
    defaultValue: "300",
    description:
      "The number of option at which to use virtualization to improve performance of the select"
  }
];

const Indicator = styled.span(() => ({
  borderRadius: "25%",
  background: "green",
  lineHeight: "0",
  display: "inline-block",
  width: "10px",
  height: "10px",
  marginRight: "5px"
}));
const CustomOption = ({ children, ...props }) => {
  const newChildren = (
    <>
      <Indicator />
      {children}
    </>
  );
  return <SelectOption {...props}>{newChildren}</SelectOption>;
};

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
      <Text>
        If you need to fetch options for the select as the interacts with the
        select, please use the{" "}
        <Link href="/components/async-select">Async Select</Link>.
      </Text>
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
      <SubsectionTitle>Replacing Inner Components</SubsectionTitle>
      <Text mb="x2">
        Using the <InlineCode>components</InlineCode> prop you can augment the
        inner components of the select. See the following example of adding a
        component to each option in the dropdown:
      </Text>
      <Select
        defaultValue={["accepted"]}
        noOptionsMessage={() => "No options"}
        placeholder="Please select inventory status"
        options={options}
        components={{
          Option: CustomOption
        }}
        multiselect
        labelText="Inventory status"
        menuPosition="fixed"
      />
      <Highlight className="js">
        {`
import { SelectOption } from "@nulogy/components";
        
const Indicator = styled.span(() => ({
            borderRadius: "25%",
            background: "green",
            lineHeight: "0",
            display: "inline-block",
            width: "10px",
            height: "10px",
            marginRight: "5px"
          }));

const CustomOption = ({ children, ...props }) => {
        const newChildren = (
          <>
            <Indicator />
            {children}
          </>
        );
        return <SelectOption {...props}>{newChildren}</SelectOption>;
      };
  
    return (
      <Select
            defaultValue={["accepted"]}
            noOptionsMessage={() => "No options"}
            placeholder="Please select inventory status"
            options={options}
            components={{
              Option: CustomOption
            }}
            multiselect
            labelText="Inventory status"
            menuPosition="fixed"
          />
    );`}
      </Highlight>

      <Table
        columns={[
          { label: "Object Key", dataKey: "keyName" },
          { label: "Component Name", dataKey: "import" },
          { label: "Description", dataKey: "description" }
        ]}
        rows={customSelectComponents}
      />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/form">Form</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/async-select">Async Select</Link>
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
