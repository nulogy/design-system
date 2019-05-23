import React from "react";
import { Helmet } from "react-helmet";
import {
  Branding,
  Button,
  DangerButton,
  PrimaryButton,
  QuietButton,
  Box,
  Flex,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
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

const propsRows = [
  {
    name: "size",
    type: "String",
    defaultValue: "medium",
    description: "Accepts medium or large to size the logo"
  },
  {
    name: "logoColor",
    type: "String",
    defaultValue: "blue",
    description: "Accepts blue or white to set the logo color theme"
  },
  {
    name: "logoType",
    type: "String",
    defaultValue: "wordmark",
    description: "Accepts wordmark or lettermark to set the logo type"
  },
  {
    name: "logoSubtext",
    type: "String",
    defaultValue: "null",
    description:
      "Subtext that is placed under the logo to signify what section of the product you are in"
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
        Branding is used to communicate what Nulogy software solution the user
        is currently in.
      </IntroText>
    </Intro>
    <DocSection>
      <Branding />
      <Highlight className="js">
        {`import { Branding } from @nulogy/components;

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
        <SubsectionTitle>With logoSubtext</SubsectionTitle>
        <Branding logoSubtext="Operational Solution" />
        <Highlight className="js">
          {`<Branding logoSubtext="Operational Solution"/>`}
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
        <Link href="https://storybook.nulogy.design/?selectedKind=Branding">
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem>
        <Link href="/components/navbar">NavBar</Link>
      </ListItem>
    </DocSection>
  </Layout>
);
