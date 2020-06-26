import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  Flex,
  Text,
  Title,
  Link,
  List,
  ListItem,
  SectionTitle,
  SubsectionTitle
} from "@nulogy/components";
import { Layout, Intro, IntroText, DocSection } from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Typography</title>
    </Helmet>
    <Intro>
      <Title>Typography</Title>
      <IntroText>
        Nulogy applications are data heavy and used in various environments.
        Sticking to a typographic scale makes our applications more predictable
        and scannable for our users. Below are all the sizes and line heights
        available to use for Nulogy applications.
      </IntroText>
      <SectionTitle mt="x4">Typeface</SectionTitle>
      <Flex flexDirection={{ extraSmall: "column", small: "row" }}>
        <Box
          width={{ extraSmall: 1, medium: 1 / 2 }}
          mb={{ extraSmall: "x3", small: 0 }}
        >
          <SubsectionTitle>IBM Plex Sans</SubsectionTitle>
          <a href="https://www.ibm.com/plex/">https://www.ibm.com/plex/</a>
        </Box>
        <Box width={{ extraSmall: 1, medium: 1 / 2 }}>
          <SubsectionTitle fontFamily="mono">IBM Plex Mono</SubsectionTitle>
          <a href="https://www.ibm.com/plex/">https://www.ibm.com/plex/</a>
        </Box>
      </Flex>
    </Intro>

    <DocSection>
      <SectionTitle>Headings</SectionTitle>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          Title (46px/48px)
        </Text>
        <Title>The quick brown fox jumps over the lazy dog</Title>
      </Box>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          SectionTitle (26px/32px)
        </Text>
        <SectionTitle>The quick brown fox jumps over the lazy dog</SectionTitle>
      </Box>
      <Box mb="x4">
        <Text color="darkGrey" fontSize="small" mb="half">
          SubsectionTitle (18px/24px)
        </Text>
        <SubsectionTitle>
          The quick brown fox jumps over the lazy dog
        </SubsectionTitle>
      </Box>
    </DocSection>

    <DocSection mb="x8">
      <SectionTitle>Interface text</SectionTitle>
      <Text>
        Standard text should set at 16px for most cases, but 14px or 12px is
        also available.
      </Text>
    </DocSection>
    <DocSection mb="x8">
      <SectionTitle>Usage</SectionTitle>
      <Text>
        Plex can be loaded in your application through whichever method you
        prefer to load fonts. An example of loading through Google fonts is
        shown below.
      </Text>
      <Highlight className="js">
        {`<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet" />
`}
      </Highlight>
      <Text mt="x2">
        Note that if your application supports Simplified Chinese, you'll also
        need to load the{" "}
        <Link href="https://www.google.com/get/noto/">Noto Sans SC</Link> font.
        For more information, see the{" "}
        <Link href="https://github.com/nulogy/design-system/blob/master/components/README.md#2-add-fonts">
          README
        </Link>
        .
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Related links</SectionTitle>
      <List>
        <ListItem>
          <Link href="/theme/">NDS theme</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/text">Text component</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/headings">Headings component</Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
