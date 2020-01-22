import React from "react";
import { Helmet } from "react-helmet";
import {
  SectionTitle,
  Title,
  MonthRange,
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
import fieldLabelProps from "../../shared/fieldLabelProps";
import localeProp from "../../shared/localeProp";

const propsRows = [
  {
    name: "onRangeChange",
    type: "function",
    defaultValue: "undefined",
    description:
      "The function that will be called whenever the dates in the month range change. Returns an object with the start date, end date and current error, if any."
  },
  {
    name: "startDateInputProps",
    type: "Object",
    defaultValue: "undefined",
    description: "Options for the start date input field, see inputProps table."
  },
  {
    name: "endDateInputProps",
    type: "Object",
    defaultValue: "undefined",
    description: "Options for the end date input field, see inputProps table."
  },
  {
    name: "defaultStartDate",
    type: "String",
    defaultValue: "undefined",
    description: "The default start date."
  },
  {
    name: "defaultEndDate",
    type: "String",
    defaultValue: "undefined",
    description: "The default end date."
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
    description: "The error message to display for the range."
  },
  {
    name: "startDateErrorMessage",
    type: "String",
    defaultValue: "undefined",
    description: "The error message to display below the start date."
  },
  {
    name: "endDateErrorMessage",
    type: "String",
    defaultValue: "undefined",
    description: "The error message to display below the end date."
  },
  {
    name: "minDate",
    type: "Date",
    defaultValue: "undefined",
    description: "The earliest date that can be selected."
  },
  {
    name: "maxDate",
    type: "Date",
    defaultValue: "undefined",
    description: "The latest date that can be selected."
  },
  {
    name: "labelProps",
    type: "Object",
    defaultValue: "{ labelText: 'Month Range'}",
    description:
      "Options for the month range label. See fieldLabelProps for available option keys."
  },
  {
    name: "disableRangeValidation",
    type: "boolean",
    defaultValue: "false",
    description: "Disables the the end date before start date error message."
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
      <title>Month Range</title>
    </Helmet>
    <Intro>
      <Title>Month Range</Title>
      <IntroText>
        Month ranges allow users to easily enter a range of months. If the end
        date is before the start date, by default an error message will be
        displayed.
      </IntroText>
    </Intro>
    <DocSection>
      <MonthRange />
      <Highlight className="js">
        {`import { MonthRange } from "@nulogy/components";

<MonthRange
        onRangeChange={(val) => val}
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
      <SectionTitle>Label Props</SectionTitle>
      <PropsTable propsRows={fieldLabelProps} />
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
          <Link href="https://storybook.nulogy.design/?path=/story/monthrange--default">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
