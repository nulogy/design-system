import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Alert,
  Heading1,
  Heading2,
  Heading3,
  Link,
  List,
  ListItem
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable,
  InlineCode,
  DocText as Text
} from "../../components";

const propsRows = [
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the heading component"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Headings</title>
    </Helmet>
    <Intro>
      <Heading1>Headings</Heading1>
      <IntroText>
        There are three level of headings available to provide hierarchy in an
        application.
      </IntroText>
    </Intro>

    <DocSection>
      <Heading1>Heading 1</Heading1>
      <Heading2>Heading 2</Heading2>
      <Heading3>Heading 1</Heading3>
      <Highlight className="js">
        {`import { Heading1, Heading2, Heading3 } from "@nulogy/components";

<Heading1>Heading 1</Heading1>
<Heading2>Heading 2</Heading2>
<Heading3>Heading 1</Heading3>
`}
      </Highlight>
      <Alert type="warning">
        The Title, SectionTitle, and SubsectionTitle naming convention has been
        replaced with Headings 1-3. The old names are currently deprecated and
        will be removed from a future version of @nulogy/components.
      </Alert>
    </DocSection>

    <DocSection>
      <Heading2>Props</Heading2>
      <PropsTable propsRows={propsRows} />
      <Text mt="x3">
        Heading components extend <Link href="/components/Text">Text</Link>, and
        thus have access to <InlineCode>typography</InlineCode>,{" "}
        <InlineCode>colour</InlineCode>, and <InlineCode>space</InlineCode>{" "}
        style props. See the{" "}
        <Link href="/guides/style-props">style prop documentation</Link> for a
        full list of available props.
      </Text>
    </DocSection>

    <DocSection>
      <Heading2>Related components</Heading2>
      <List>
        <ListItem>
          <Link href="/components/text">Text</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <Heading2>Resources</Heading2>
      <List>
        <ListItem>
          <Link href="/theme/">NDS theme</Link>
        </ListItem>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/headings--title">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
