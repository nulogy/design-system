import React from "react";
import { Helmet } from "react-helmet";
import {
  SectionTitle,
  Title,
  MonthPicker,
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
import localeProp from "../../shared/localeProp";

const propsRows = [
  {
    name: "selected",
    type: "Date",
    defaultValue: "undefined",
    description: "the time to display"
  },
  {
    name: "inputProps",
    type: "Object",
    defaultValue: "undefined",
    description: "Options for the input field, see inputProps table "
  },
  {
    name: "dateFormat",
    type: "String",
    defaultValue: "MMM yyyy",
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
  localeProp,
  {
    name: "disableAutocomplete",
    type: "boolean",
    defaultValue: "false",
    description: "Disables auto-completing the year after typing in the month"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Month Picker</title>
    </Helmet>
    <Intro>
      <Title>Month Picker</Title>
      <IntroText>Month pickers allow users to easily enter months.</IntroText>
    </Intro>
    <DocSection>
      <MonthPicker selected={new Date("Fri, 01 Jan 2019")} />
      <Highlight className="js">
        {`import { MonthPicker } from "@nulogy/components";

<MonthPicker
        selected={new Date("Fri, 01 Jan 2019")}
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
          <Link href="/components/date-picker">Date Picker</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/time-picker">Time Picker</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/monthpicker--default">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
