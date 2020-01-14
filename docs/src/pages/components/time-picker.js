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
import { timePickerProps } from "../../shared/timePickerProps";

const propsRows = timePickerProps;

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
