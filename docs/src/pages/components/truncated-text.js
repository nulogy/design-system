/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  SectionTitle,
  Title,
  Link,
  ListItem,
  List,
  Text,
  TruncatedText
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
    name: "children",
    type: "string",
    defaultValue: "Required",
    description: "The content to be truncated"
  },
  {
    name: "indicator",
    type: "string",
    defaultValue: "...",
    description: "The text to display after content that is truncated"
  },
  {
    name: "maxCharacters",
    type: "number",
    defaultValue: "20",
    description: "The number of characters to display"
  },
  {
    name: "showTooltip",
    type: "boolean",
    defaultValue: "true",
    description: "Displays a tooltip with the full content"
  },
  {
    name: "tooltipProps",
    type: "object",
    description: "Additional options for the tooltip, see Tooltip Props table"
  }
];

const tooltipPropsRows = [
  {
    name: "tooltip",
    type: "node",
    defaultValue: "Required",
    description: "The content to display inside of the tooltip."
  },
  {
    name: "children",
    type: "element",
    defaultValue: "Required",
    description: "Single child of tooltip must be able to accept a ref."
  },
  {
    name: "maxWidth",
    type: "string",
    defaultValue: "24em",
    description: "Width of the tooltip."
  },
  {
    name: "placement",
    type: "string",
    defaultValue: "bottom",
    description:
      "The position of the tooltip relative to its trigger. Accepts top, top-start, top-end, bottom, bottom-end, left, left-start, left-end, right, right-start and right-end."
  },
  {
    name: "showDelay",
    type: "number|string",
    defaultValue: "100",
    description: "Time in seconds before the tooltip appears."
  },
  {
    name: "hideDelay",
    type: "number|string",
    defaultValue: "350",
    description: "Time in seconds before the tooltip disappears."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the tooltip container element."
  },
  {
    name: "defaultOpen",
    type: "boolean",
    defaultValue: "false",
    description: "when set to true the tooltip will be open by default"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Truncated Text</title>
    </Helmet>
    <Intro>
      <Title>Truncated Text</Title>
      <IntroText>
        Displays text that is truncated if it is longer than the maximum number
        of characters. Optionally displays the full content within a tooltip
        when the user hovers over the text.
      </IntroText>
    </Intro>

    <DocSection>
      <TruncatedText>
        Special instructions are provided for the shipment
      </TruncatedText>
      <Highlight className="js">
        {`<TruncatedText>Special instructions are provided for the shipment</TruncatedText>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <Text>
        In addition to the props in the table below, props from the{" "}
        <Link href="/components/text">Text</Link> component can also be passed
        to TruncatedText.
      </Text>
      <PropsTable propsRows={propsRows} />
    </DocSection>
    <DocSection>
      <SectionTitle>Tooltip Props</SectionTitle>
      <PropsTable propsRows={tooltipPropsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/text">Text</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/tooltip">Tooltip</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem>
        <Link href="https://storybook.nulogy.design/?path=/story/truncatedtext--truncatedtext">
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
