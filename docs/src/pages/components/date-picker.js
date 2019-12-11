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
import radioProps from "../../shared/radioProps";

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
        onChangeInput={(val) => val}
      />
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={radioProps} />
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
