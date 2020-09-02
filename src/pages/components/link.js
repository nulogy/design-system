import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
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
  PropsTable
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "href",
    type: "String",
    defaultValue: "Required",
    description: "The destination."
  },
  {
    name: "color",
    type: "String",
    defaultValue: "blue",
    description: "A custom colour to display the link in."
  },
  {
    name: "hover",
    type: "String",
    defaultValue: "Color darkened by 10%",
    description: "A custom hover colour"
  },
  {
    name: "underline",
    type: "Boolean",
    defaultValue: true,
    description: "Whether to show an underline or not."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the link component."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Link</title>
    </Helmet>
    <Intro>
      <Title>Link</Title>
      <IntroText>
        A styled <em>a</em> tag that can be used to send users to a URL.
      </IntroText>
    </Intro>

    <DocSection>
      <Link href="http://nulogy.design">nulogy.design</Link>
      <Highlight className="js">
        {`import { Link } from "@nulogy/components";

<Link href="http://nulogy.design">nulogy.design</Link>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Without an underline</SubsectionTitle>
        <Link href="http://nulogy.design" underline={false}>
          nulogy.design
        </Link>
        <Highlight className="js">
          {
            '<Link href="http://nulogy.design" underline="false">nulogy.design</Link>'
          }
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>With a custom colour</SubsectionTitle>
        <Link color="black" hover="red" href="http://nulogy.design">
          nulogy.design
        </Link>
        <Highlight className="js">
          {
            '<Link color="black" hover="red" href="http://nulogy.design">nulogy.design</Link>'
          }
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}link--link`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem>
        <Link href="/components/buttons">Buttons</Link>
      </ListItem>
    </DocSection>
  </Layout>
);
