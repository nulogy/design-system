import React from "react";
import { Helmet } from "react-helmet";
import {
  SectionTitle,
  Title,
  TimePicker,
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
import selectProps from "../../shared/selectProps";

const propsRows = [
  {
    name: "timeFormat",
    type: "String",
    defaultValue: "hh:mm aa",
    description:
      "The default time format (see date-fns for available time formats)"
  },
  {
    name: "interval",
    type: "Number",
    defaultValue: "15",
    description: "The time difference in minutes between the time options"
  },
  {
    name: "minTime",
    type: "24 hour time string e.g: 02:30",
    defaultValue: "undefined",
    description: "The latest time that can be selected."
  },
  {
    name: "maxTime",
    type: "24 hour time string e.g: 02:30",
    defaultValue: "undefined",
    description: "The latest time that can be selected."
  },
  {
    name: "locale",
    type: "string",
    defaultValue: "undefined",
    description:
      "Locale string ex: 'uk'. For all supported locales see the knobs under the 'custom locale' example in storybook"
  },
  ...selectProps.filter(prop => prop.name !== "options")
];

export default () => (
  <Layout>
    <Helmet>
      <title>Time Picker</title>
    </Helmet>
    <Intro>
      <Title>Time Picker</Title>
      <IntroText>Time pickers allow users to easily enter times.</IntroText>
    </Intro>
    <DocSection>
      <TimePicker />
      <Highlight className="js">
        {`import { TimePicker } from "@nulogy/components";

<TimePicker
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
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/date-picker">Date Picker</Link>
        </ListItem>
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
          <Link href="https://storybook.nulogy.design/?path=/story/timepicker--default">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
