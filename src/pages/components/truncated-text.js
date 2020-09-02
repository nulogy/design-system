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
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "children",
    type: "string",
    defaultValue: "Required",
    description: "The content to be truncated"
  },
  {
    name: "element",
    type: "node",
    defaultValue: "<Text />",
    description:
      "The element to use to wrap the truncated text. Props can be passed to this element as usual."
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
    description: "Additional options for to be passed to the tooltip"
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
        {`import { TruncatedText } from "@nulogy/components";

<TruncatedText>Special instructions are provided for the shipment</TruncatedText>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>
    <DocSection>
      <SectionTitle>Tooltip Props</SectionTitle>
      <Text>
        Props from the <Link href="/components/tooltip">Tooltip</Link> component
        can also be passed throught the tooltipProps object.
      </Text>
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
        <Link href={`${STORYBOOK_COMPONENT_URL}truncatedtext--truncatedtext`}>
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
