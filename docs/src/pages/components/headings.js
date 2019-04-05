import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  SectionTitle, SubsectionTitle, Title, Link, ListItem,
} from "@nulogy/components";
import {
  Layout, Intro, IntroText, DocSection, PropsTable,
} from "../../components";
import { margins } from "../../shared/systemProps";

const propsRows = [
  {
    name: "color", type: "String", defaultValue: "darkBlue", description: "Sets color based on the theme.color object",
  },
  ...margins,
  {
    name: "textAlign", type: "String", defaultValue: "left", description: "Sets text-align to either left, center or right",
  },
];

export default () => (
  <Layout>
    <Helmet>
      <title>Headings</title>
    </Helmet>
    <Intro>
      <Title>Headings</Title>
      <IntroText>There are three level of headings available to provide hierarchy in an application.</IntroText>
    </Intro>

    <DocSection>
      <Title>Title</Title>
      <SectionTitle>SectionTitle</SectionTitle>
      <SubsectionTitle>SubsectionTitle</SubsectionTitle>
      <Highlight className="js">
        {`import { Title, SectionTitle, SubsectionTitle } from @nulogy/components;

<Title>Title</Title>
<SectionTitle>SectionTitle</SectionTitle>
<SubsectionTitle>SubsectionTitle</SubsectionTitle>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={ propsRows } />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem><Link href="/components/text">Text</Link></ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem><Link href="https://nulogy.design/tokens/">NDS theme</Link></ListItem>
      <ListItem><Link href="https://storybook.nulogy.design/?selectedKind=Headings">View in Storybook</Link></ListItem>
    </DocSection>
  </Layout>
);
