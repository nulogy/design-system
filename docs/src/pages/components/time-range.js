import React from "react";
import { Helmet } from "react-helmet";
import {
  SectionTitle,
  Title,
  TimeRange,
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
import fieldLabelProps from "../../shared/fieldLabelProps";

const propsRows = [
  {
    name: "onRangeChange",
    type: "function",
    defaultValue: "undefined",
    description:
      "The function that will be called whenever the dates in the month range change. Returns an object with the start date, end date and current error, if any."
  },
  {
    name: "defaultStartTime",
    type: "String",
    defaultValue: "undefined",
    description: "The default start date."
  },
  {
    name: "defaultEndTime",
    type: "String",
    defaultValue: "undefined",
    description: "The default end date."
  },
  {
    name: "timeFormat",
    type: "String",
    defaultValue: "hh:mm aa",
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
    name: "startTimeErrorMessage",
    type: "String",
    defaultValue: "undefined",
    description: "The error message to display below the start date."
  },
  {
    name: "endTimeErrorMessage",
    type: "String",
    defaultValue: "undefined",
    description: "The error message to display below the end date."
  },
  {
    name: "minTime",
    type: "24 hour time string e.g: 02:30",
    defaultValue: "undefined",
    description: "The earliest time that can be selected."
  },
  {
    name: "maxTime",
    type: "24 hour time string e.g: 02:30",
    defaultValue: "undefined",
    description: "The latest time that can be selected."
  },
  {
    name: "labelProps",
    type: "Object",
    defaultValue: "{ labelText: 'Time Range'}",
    description:
      "Options for the month range label. See Label Props for available option keys."
  },
  {
    name: "disableRangeValidation",
    type: "boolean",
    defaultValue: "false",
    description: "Disables the the end date before start date error message."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Time Range</title>
    </Helmet>
    <Intro>
      <Title>Time Range</Title>
      <IntroText>
        Time ranges allow users to easily enter a range of dates. If the end
        date is before the start date, by default an error message will be
        displayed.
      </IntroText>
    </Intro>
    <DocSection>
      <TimeRange />
      <Highlight className="js">
        {`import { TimeRange } from "@nulogy/components";

<TimeRange
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
      <SectionTitle>Label Props</SectionTitle>
      <PropsTable propsRows={fieldLabelProps} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/date-range">Date Range</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/month-range">Month Range</Link>
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
          <Link href="https://storybook.nulogy.design/?path=/story/timerange--default">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
