import React from "react";
import { Helmet } from "react-helmet";
import {
  Branding,
  Box,
  Flex,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "size",
    type: "String",
    defaultValue: "medium",
    description: "Accepts small, medium or large."
  },
  {
    name: "logoColor",
    type: "String",
    defaultValue: "blue",
    description: "Accepts blue or white to set the logo color theme."
  },
  {
    name: "logoType",
    type: "String",
    defaultValue: "wordmark",
    description: "Accepts wordmark or lettermark to set the logo type."
  },
  {
    name: "subtext",
    type: "String",
    defaultValue: "null",
    description:
      "Subtext that is placed under the logo to specify the specific software product a user is interacting with."
  },
  {
    name: "withLine",
    type: "Bool",
    defaultValue: "false",
    description: "Horizontal line around the subtext, subtext must be defined."
  },
  {
    name: "alignment",
    type: "String",
    defaultValue: "right",
    description:
      "Accepts left, center, or right to align the logo and logo subtext."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the branding component."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Branding</title>
    </Helmet>
    <Intro>
      <Title>Branding</Title>
      <IntroText>
        Branding is used to indicate that a user is interacting with Nulogy
        software.
      </IntroText>
    </Intro>
    <DocSection>
      <Branding />
      <Highlight className="js">
        {`import { Branding } from "@nulogy/components";

<Branding/>
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Text>
        The following variations are available on the Branding component.
        Variations can be combined for the desired state.
      </Text>
      <Box mb="x6">
        <SubsectionTitle>Lettermark</SubsectionTitle>
        <Branding logoType="lettermark" />
        <Highlight className="js">
          {`<Branding logoType="lettermark"/>`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>White</SubsectionTitle>
        <Box bg="black">
          <Branding logoColor="white" />
        </Box>
        <Highlight className="js">{`<Branding logoColor="white"/>`}</Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Large</SubsectionTitle>
        <Branding size="large" />
        <Highlight className="js">{`<Branding size="large"/>`}</Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>With subtext</SubsectionTitle>
        <Branding subtext="Logo Subtext" />
        <Highlight className="js">
          {`<Branding subtext="Logo Subtext"/>`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Alignment</SubsectionTitle>
        <Flex my="x2" justifyContent="space-between">
          <Branding subtext="Left Align" alignment="left" />
          <Branding subtext="Center Align" alignment="center" />
          <Branding subtext="Right Align" alignment="right" />
        </Flex>
        <Highlight className="js">
          {`<Flex justifyContent="space-between">
  <Branding subtext="Left Align" alignment="left"/>
  <Branding subtext="Center Align" alignment="center"/>
  <Branding subtext="Right Align" alignment="right"/>
</Flex>`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>With Line</SubsectionTitle>
        <Branding withLine alignment="center" subtext="Logo Subtext" />
        <Highlight className="js">
          {`<Branding withLine alignment="center" subtext="Logo Subtext"/>`}
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
          <Link href={`${STORYBOOK_COMPONENT_URL}branding--branding`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/navbar">NavBar</Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
