import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  SectionTitle,
  SubsectionTitle,
  Title,
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
      <Title>Headings</Title>
      <IntroText>
        There are three level of headings available to provide hierarchy in an
        application.
      </IntroText>
    </Intro>

    <DocSection>
      <Title>Title</Title>
      <SectionTitle>SectionTitle</SectionTitle>
      <SubsectionTitle>SubsectionTitle</SubsectionTitle>
      <Highlight className="js">
        {`import { Title, SectionTitle, SubsectionTitle } from "@nulogy/components";

<Title>Title</Title>
<SectionTitle>SectionTitle</SectionTitle>
<SubsectionTitle>SubsectionTitle</SubsectionTitle>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
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
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/text">Text</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
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
