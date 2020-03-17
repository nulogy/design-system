/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  StatusIndicator,
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  Text,
  ListItem
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable,
  InlineCode
} from "../../components";

const propsRows = [
  {
    name: "type",
    type: "string",
    defaultValue: "neutral",
    description:
      "The type of Status Indicator. Accepts neutral, informative, danger, warning, success, and quiet."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Status Indicator</title>
    </Helmet>
    <Intro>
      <Title>Status Indicator</Title>
      <IntroText>
        Status Indicator communicates the state of an object.
      </IntroText>
    </Intro>

    <DocSection>
      <StatusIndicator>In progress</StatusIndicator>
      <Highlight className="js">
        {`import {StatusIndicator} from "@nulogy/components";

<StatusIndicator>In progress</StatusIndicator>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use to</SectionTitle>
      <List>
        <ListItem>
          Show a progression through the life cycle stages of an object
          (Started, In progress, In review, Completed, ...)
        </ListItem>
        <ListItem>
          Compare objects qualitatively (Example: Good, Bad, Quarantined, ...)
        </ListItem>
        <ListItem>
          Monitor the number of quantifiable characteristics of an object (time,
          materials). (Example: On time, Late, Early, Out of stock, Running low,
          ...)
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Neutral</SubsectionTitle>
        <Text mb="x3">
          Used for neutral states and states that indicate progression.
          (Example: Staring, In progress, Pending ...)
        </Text>
        <StatusIndicator>In progress</StatusIndicator>
        <Highlight className="js">
          {`import {StatusIndicator} from "@nulogy/components";

<StatusIndicator>In progress</StatusIndicator>
`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Informative</SubsectionTitle>
        <Text mb="x3">
          Used for indicating the objects that underwent a change. (Example:
          New, Updated, ...)
        </Text>
        <StatusIndicator type="informative">New</StatusIndicator>
        <Highlight className="js">
          {`import {StatusIndicator} from "@nulogy/components";

<StatusIndicator type="informative">Informative</StatusIndicator>
`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Success</SubsectionTitle>
        <Text mb="x3">
          Used for optimistic and positive statuses. (Example: 2 days early,
          Good, On track ...)
        </Text>
        <StatusIndicator type="success">2 days early</StatusIndicator>
        <Highlight className="js">
          {`import {StatusIndicator} from "@nulogy/components";

<StatusIndicator type="success">2 days early</StatusIndicator>
`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Danger</SubsectionTitle>
        <Text mb="x3">
          Used for statuses that indicate failure that may or may not be in your
          control. (Example: Canceled, Bad, Late ...)
        </Text>
        <StatusIndicator type="danger">Canceled</StatusIndicator>
        <Highlight className="js">
          {`import {StatusIndicator} from "@nulogy/components";

<StatusIndicator type="danger">Canceled</StatusIndicator>
`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Warning</SubsectionTitle>
        <Text mb="x3">
          Used for statuses that require attention in order to prevent failure.
          (Example: At risk, ...)
        </Text>
        <StatusIndicator type="warning">At risk</StatusIndicator>
        <Highlight className="js">
          {`import {StatusIndicator} from "@nulogy/components";

<StatusIndicator type="warning">At risk</StatusIndicator>
`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Quiet</SubsectionTitle>
        <Text mb="x3">
          Used for secondary states when 2 statuses are combined.
        </Text>
        <StatusIndicator type="quiet">Quiet</StatusIndicator>
        <Highlight className="js">
          {`import {StatusIndicator} from "@nulogy/components";

<StatusIndicator type="quiet">Quiet</StatusIndicator>
`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
      <Text mt="x3">
        The StatusIndicator component has access to{" "}
        <InlineCode>space</InlineCode>, <InlineCode>typography</InlineCode>, and{" "}
        <InlineCode>flexbox</InlineCode> style props. See the{" "}
        <Link href="/guides/style-props">style prop documentation</Link> for a
        full list of available props.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/statusindicator--all">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
