import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Breadcrumbs,
  SectionTitle,
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
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "as",
    type: "Element type",
    defaultValue: "nav",
    description: "The element that wraps the breacrumbs"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Breadcrumbs</title>
    </Helmet>
    <Intro>
      <Title>Breadcrumbs</Title>
      <IntroText>
        A breadcrumbs component that wraps around links or text to help orient
        the user within the application.
      </IntroText>
    </Intro>

    <DocSection>
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/Tenants">Tenants</Link>
      </Breadcrumbs>
      <Highlight className="js">
        {`import { Breadcrumbs, Link } from "@nulogy/components";

<Breadcrumbs>
      <Link href="/">Home</Link>
      <Link href="/Tenants">Tenants</Link>
    </Breadcrumbs>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/breadcrumbs--breadcrumbs">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem>
        <Link href="/components/link">Link</Link>
      </ListItem>
    </DocSection>
  </Layout>
);
