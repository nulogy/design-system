import React from "react";
import { Helmet } from "react-helmet";
import {
  SectionTitle,
  Title,
  DatePicker,
  ListItem,
  List,
  Link
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import { inputFieldProps } from "../../shared/inputProps";

const propsRows = [
  {
    name: "selected",
    type: "Date",
    defaultValue: "undefined",
    description: "The time to display"
  },
  {
    name: "inputProps",
    type: "Object",
    defaultValue: "undefined",
    description: "Options for the input field, see inputProps table "
  },
  {
    name: "onChange",
    type: "Function",
    defaultValue: "undefined",
    description:
      "Change event handler that will be run whenever the value of the input is updated."
  },
  {
    name: "onInputChange",
    type: "Function",
    defaultValue: "undefined",
    description: "Event handler for when the value typed into the input changes"
  },
  {
    name: "dateFormat",
    type: "String",
    defaultValue: "dd MMM yyyy",
    description:
      "The default date format (see date-fns for available date formats)"
  },
  {
    name: "errorMessage",
    type: "String",
    defaultValue: "undefined",
    description: "The error message to display"
  },
  {
    name: "minDate",
    type: "Date",
    defaultValue: "undefined",
    description: "The earliest date that can be selected"
  },
  {
    name: "maxDate",
    type: "Date",
    defaultValue: "undefined",
    description: "The latest date that can be selected"
  },
  {
    name: "disableFlipping",
    type: "boolean",
    defaultValue: "false",
    description:
      "Disables the calendar from opening in a direction other than bottom when there isn't space"
  },
  {
    name: "className",
    type: "string",
    defaultValue: "undefined"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Date Picker</title>
    </Helmet>
    <Intro>
      <Title>Date Picker</Title>
      <IntroText>Date pickers allow users to easily enter dates.</IntroText>
    </Intro>
    <DocSection>
      <DatePicker
        selected={new Date("Fri, 01 Jan 2019")}
        dateFormat="MMMM d, yyyy"
      />
      <Highlight className="js">
        {`import { DatePicker } from "@nulogy/components";

<DatePicker
  selected={new Date("Fri, 01 Jan 2019")}
  dateFormat="MMMM d, yyyy"
  onChange={(val) => val}
  onInputChange={(val) => val}
/>
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>
    <DocSection>
      <SectionTitle>Input Props</SectionTitle>
      <PropsTable propsRows={inputFieldProps} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/input">Input</Link>
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
          <Link href="https://storybook.nulogy.design/?path=/story/datepicker--default">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
