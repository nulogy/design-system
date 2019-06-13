/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button,
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Tooltip,
  Text
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "tooltip",
    type: "node",
    defaultValue: "Required",
    description: "The content to display inside of the tooltip"
  },
  {
    name: "maxWidth",
    type: "string",
    defaultValue: "24em",
    description: "Width of the tooltip"
  },
  {
    name: "placement",
    type: "string",
    defaultValue: "bottom",
    description:
      "The position of the tooltip relative to its trigger. Accepts top, top-start, top-end, bottom, bottom-end, left, left-start, left-end, right, right-start and right-end"
  },
  {
    name: "showDelay",
    type: "number|string",
    defaultValue: "100",
    description: "Time in seconds before the tooltip appears"
  },
  {
    name: "hideDelay",
    type: "number|string",
    defaultValue: "350",
    description: "Time in seconds before the tooltip disappears"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Tooltip</title>
    </Helmet>
    <Intro>
      <Title>Tooltip</Title>
      <IntroText>
        User-triggered messages that provide additional information about
        something on a page. Tooltips are accessed by hovering with a mouse or
        tapping on a touch screen.
      </IntroText>
    </Intro>

    <DocSection>
      <Tooltip placement="bottom" tooltip="I am a Tooltip!">
        <Button>Hover me</Button>
      </Tooltip>
      <Highlight className="js">
        {`<Tooltip placement="bottom" tooltip="I am a Tooltip!">
  <Button>Hover me</Button>
</Tooltip>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <List>
        <ListItem>
          There is additional information that could be helpful to a user
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Don't use when </SectionTitle>
      <List>
        <ListItem>
          The information contained is vital to completing a task
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>With a maximum width</SubsectionTitle>
        <Tooltip
          placement="bottom"
          tooltip="I am a Tooltip! I have very long text, but I have a smaller width"
          maxWidth="128px"
        >
          <Button>Hover me</Button>
        </Tooltip>
        <Highlight className="js">
          {`<Tooltip
  placement="bottom"
  tooltip="I am a Tooltip! I have very long text, but I have a smaller width"
  maxWidth="128px"
>
  <Button>Hover me</Button>
</Tooltip>
`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With custom placement</SubsectionTitle>

        <Tooltip
          placement="top"
          tooltip="I'm above instead of below! See the props table below for all placement options."
        >
          <Button>Hover me</Button>
        </Tooltip>

        <Highlight className="js">
          {`<Tooltip
  placement="top"
  tooltip="I'm above instead of below! See the props table below for all placement options.">
    <Button>Hover me</Button>
</Tooltip>`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With custom delay</SubsectionTitle>
        <Tooltip
          placement="bottom"
          tooltip="I'm slow to appear and disappear"
          showDelay="1000"
          hideDelay="1000"
        >
          <Button>Hover me</Button>
        </Tooltip>
        <Highlight className="js">
          {`<Tooltip
  placement="bottom"
  tooltip="I'm slow to appear and disappear"
  showDelay="1000"
  hideDelay="1000"
>
  <Button>Hover me</Button>
</Tooltip>`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>With non-text content</SubsectionTitle>
        <Tooltip tooltip={<Button href="/">Button inception</Button>}>
          <Button>Hover me</Button>
        </Tooltip>
        <Highlight className="js">
          {`<Tooltip tooltip={<Button href="/">Button inception</Button>}>
  <Button>Hover me</Button>
</Tooltip>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem>
        <Link href="https://storybook.nulogy.design/?path=/story/tooltip--tooltip">
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
